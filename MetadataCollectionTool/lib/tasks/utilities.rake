namespace :utilities do

  QUESTIONNAIRE = File.join(Rails.root, 'app', 'frontend', 'components', 'Questionnaire', 'Research-data-metadata.R4.json')

  # Iterate through all sections of a questionnaire or response; this also acts like flat-map returning a flat
  # array with the result of a block on each section with nils filtered out and arrays flattened; the block
  # gets called with each section as well as the depth of that section; the traversal is depth first in order
  def iterate(section)
    results = []
    sections = [{ section: section, depth: 0 }]
    while sections.length > 0
      sections.shift => {section:, depth:}
      result = yield section, depth
      if result && result.is_a?(Array)
        results += result
      elsif result
        results << result
      end
      sections = section['answer'].map { |s| { section: s, depth: depth + 1 } } + sections if section['answer']
      sections = section['item'].map { |s| { section: s, depth: depth + 1 } } + sections if section['item']
    end
    return results
  end

  # Get all the linkIds in the questionnare or response
  def get_ids(section)
    iterate(section) { |s| s['linkId'] if s['linkId'] }
  end

  # Given a linkId return the section with that linkId, if present
  def get_section_by_id(section, id)
    iterate(section) do |s|
      return s if s['linkId'] == id
    end
    return nil
  end

  # Return a questionnaire or response with sections that match the block removed
  def filter(section, &block)
    return nil if yield section
    result = {}
    section.keys.each do |key|
      if key == 'answer' || key == 'item'
        updated = section[key].map { |ss| filter(ss, &block) }.compact
        result[key] = updated if updated.length > 0
      else
        result[key] = section[key]
      end
    end
    result
  end

  # Return a questionnaire or response with sections updated
  def update(section, &block)
    result = {}
    section.keys.each do |key|
      if key == 'answer' || key == 'item'
        result[key] = section[key].map { |ss| update(ss, &block) }
      else
        result[key] = section[key]
      end
    end
    # Return the result after it's processed by the supplied block
    yield result
  end

  desc "Display help text from the questionnaire"
  task help_text: :environment do
    # Load the questionnaire
    questionnaire = JSON.parse(File.read(QUESTIONNAIRE))
    # Grab the help texts and then display them with the content that the text annotates
    help_texts = iterate(questionnaire) { |s| s if s['linkId']&.match('_helpText') }
    help_texts.each do |ht|
      question_id = ht['linkId'].gsub('_helpText', '')
      question = get_section_by_id(questionnaire, question_id)
      if question
        puts "#{question['type'] == 'group' ? 'Section' : 'Question'}: #{question['text']}\nHelp Text: #{ht['text']}\n\n"
      else
        puts "WARNING: Help text #{ht['linkId']} does not annotate any content we could find"
      end
    end
  end

  desc "Display every question along with the answer options if there are any"
  task list_questions: :environment do
    # Load the questionnaire
    questionnaire = JSON.parse(File.read(QUESTIONNAIRE))
    # Go through and display all the questions including any options for the answer
    iterate(questionnaire) do |section, depth|
      case section['type']
      when 'string', 'text'
        puts "#{' ' * ((depth-2) * 4)}#{section['text']}"
        puts "#{' ' * ((depth-2) * 4)}  [type a value]"
        puts
      when 'choice', 'open-choice'
        type = section['repeats'] ? 'select one or more' : 'select one'
        puts "#{' ' * ((depth-2) * 4)}#{section['text']} [#{type}]"
        section['answerOption'].map { |option| option.dig('valueCoding', 'display') }.each do |option|
          puts "#{' ' * ((depth-2) * 4)}  #{option}"
        end
        if section['type'] == 'open-choice'
          puts "#{' ' * ((depth-2) * 4)}  [type a value]"
        end
        puts
      end
    end
  end

  desc "Validate conditional questionnaire sections"
  task validate_questionnaire: :environment do
    # Load the questionnaire
    questionnaire = JSON.parse(File.read(QUESTIONNAIRE))

    # Find all conditional sections and make sure there's a matching question and possibly option for each
    enable_whens = iterate(questionnaire) { |s| s['enableWhen'] }
    enable_whens.each do |ew|
      question = get_section_by_id(questionnaire, ew['question'])
      if !question
        puts "Could not find the matching question for an enableWhen:\n#{JSON.pretty_generate(ew)}\n\n"
        next
      end
      next if ew['operator'] == 'exists'
      expected_option = ew.dig('answerCoding', 'display')
      next unless expected_option
      if !question['answerOption']
        puts "The matching question for an enableWhen does not have options:\n#{JSON.pretty_generate(ew)}\n#{JSON.pretty_generate(question)}\n\n"
        next
      end
      options = question['answerOption'].map { |o| o.dig('valueCoding', 'display') }
      if !options.include?(expected_option)
        puts "The answers for the matching question for an enableWhen do not include a match for this expected answer:"
        puts "#{JSON.pretty_generate(ew)}"
        puts "Valid options are:"
        puts "#{JSON.pretty_generate(options)}\n\n"
        next
      end
    end

    # Find all answer sets and make sure that all answer sets with the same answers are in the same order
    answer_sets = iterate(questionnaire) { |s| s['answerOption'] && [s['answerOption'].map { |ao| ao.dig('valueCoding', 'display') }] }
    answer_sets.combination(2).each do |as1, as2|
      if as1 != as2 && as1.sort == as2.sort
        puts "Found the following mismatched answer set orders"
        puts "  #{as1.inspect}"
        puts "  #{as2.inspect}\n\n"
      end
    end

    # Make sure the name of the dataset is in the expected location
    name_section = get_section_by_id(questionnaire, '183743825557')
    if name_section.nil? || name_section['text'] != "Enter the name of the dataset"
      puts "Could not find the question asking for the dataset name"
    end
  end

  desc "List incompatibilities in questionnaire responses"
  task list_incompatible: :environment do
    # Load the questionnaire
    questionnaire = JSON.parse(File.read(QUESTIONNAIRE))
    # Loop through all active responses
    QuestionnaireResponse.where(deleted: false).each do |response|
      # Find all response IDs that no longer have a question
      missing_ids = get_ids(response.resource) - get_ids(questionnaire)
      if missing_ids.length > 0
        puts "Response #{response.dataset_name} ID #{response.id} (#{response.user_email}) " \
             "has #{missing_ids.length} responses where questions have been removed"
      end
    end
  end

  desc "Fix incompatibilities in a questionnaire response (set ID to questionnaire ID to fix)"
  task fix_incompatible: :environment do
    raise "Please set the ID environment variable to a valid response ID" unless ENV['ID']
    # Load the questionnaire
    questionnaire = JSON.parse(File.read(QUESTIONNAIRE))
    # Find the response to fix and fix it
    response = QuestionnaireResponse.find(ENV['ID'])
    puts "Fixing questionnaire response #{response.dataset_name} for user #{response.user_email}"
    missing_ids = get_ids(response.resource) - get_ids(questionnaire)
    missing_ids.each do |missing_id|
      puts "Removing response for missing question #{missing_id}"
      response.resource = filter(response.resource) { |section| section['linkId'] == missing_id }
    end
    missing_ids = get_ids(response.resource) - get_ids(questionnaire)
    raise "Failed to fix response" unless missing_ids.size == 0
    response.save
  end

  desc "Re-order response sections to share a consistent order of options"
  task fix_questionnaire_ordering: :environment do
    # Load the questionnaire
    questionnaire = JSON.parse(File.read(QUESTIONNAIRE))
    # These are the orders we want
    orders = [
      ["Yes", "Yes, with conditions", "No", "I don't know", "It doesn't say"],
      ["Data coordinating center", "Data provider", "Data repository", "Government organization", "Principal investigator"],
      ["Data coordinating center", "Data provider", "Data requester", "Data repository", "Principal investigator"]
    ]
    # Look for sections that have these answer options and replace them with correctly sorted versions
    updated_questionnaire = update(questionnaire) do |section|
      orders.each do |order|
        if section['answerOption'] && section['answerOption'].map { |ao| ao.dig('valueCoding', 'display') }.sort == order.sort
          section['answerOption'] = section['answerOption'].sort_by { |ao| order.index(ao.dig('valueCoding', 'display')) }
        end
      end
      section
    end
    puts JSON.pretty_generate(updated_questionnaire)
  end

  desc "Export a questionnaire response given the ID (set ID environment variable)"
  task export: :environment do
    raise "Please set the ID environment variable to a valid response ID" unless ENV['ID']
    response = QuestionnaireResponse.find(ENV['ID'])
    puts JSON.pretty_generate(response.resource)
  end

end
