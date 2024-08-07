require 'csv'

# NOTE: Our exploratory approach here is based on linkIds in the response, which is fragile against certain
# questionnaire changes; this code is written against questionnaire version 2.8.5

# NOTE: Coded answers currently don't include a code, just the display text; matching against that is fragile
# against language changes, and using a code instead would reduce fragility; there are also instances where
# similar-but-different language appears in different sections


# Utility method for dealing with questionnaire responses: given an answer just pull out the answer itself and
# the type (coded, freetext, or integer); supports a single answer or an array of answers
def parse_answer(answer)
  if answer.is_a?(Array)
    return answer.map { |a| parse_answer(a) }
  else
    raise "Multiple types of answers detected" if answer.keys.grep(/^answer/).length > 1
    if answer['valueCoding']
      return { value: answer['valueCoding']['display'], type: :coded }
    elsif answer['valueString']
      return { value: answer['valueString'], type: :freetext }
    elsif answer['valueInteger']
      return { value: answer['valueInteger'], type: :integer }
    else
      raise "Unsupported answer type found: #{answer.inspect}"
    end
  end
end

# Utility method to iterate through every answer in a questionnaire response; yields each answer (which may
# have multiple values), along with all the text "above" the answer
def iterate_answers(section)
  sections = [{ section: section, path: [], ids: [] }]
  while sections.length > 0
    sections.shift => { section:, path:, ids: }
    if section['answer']
      yield parse_answer(section['answer']), (path + [section['text']]).compact.map(&:strip), (ids + [section['linkId']]).compact
      sections = section['answer'].map { |s| { section: s, path: path + [section['text']], ids: ids + [section['linkId']] } } + sections
    end
    if section['item']
      sections = section['item'].map { |s| { section: s, path: path + [section['text']], ids: ids + [section['linkId']] } } + sections
    end
  end
end

# Utility method to track a permission along with duties and constraints and display freetext input that could
# not be put in the schema model
def add_permission(policy, action, answer_set, question=nil)
  policy[:permission] ||= {}
  policy[:permission][action] ||= []
  policy[:permission][action] += answer_set.select { |a| a[:type] == :coded }.map { |a| a[:value] }
  answer_set.select { |a| a[:type] == :freetext }.each do |a|
    question_text = " for question '#{question}'" if question
    puts "Cannot capture freetext answer '#{a[:value]}'#{question_text}"
  end
end

# Utility method to track a prohibitions and display freetext input that could not be put in the schema model
def add_prohibition(policy, answer_set, question=nil)
  policy[:prohibition] ||= {}
  answer_set.select { |a| a[:type] == :coded }.each do |a|
    action = case a[:value]
             when 'Individuals in the dataset may not be re-identified'
               :reidentify
             when 'The dataset may not be linked'
               :link
             when 'The dataset may not be shared'
               :share
             when 'The dataset may not be accessed for secondary purposes'
             when 'The dataset may not be accessed for secondary use'
               :access
             when 'The dataset may not be used for secondary purposes'
               :researchUse
             when 'The dataset may not be used for commercial purposes'
               # NOTE: Not currently part of schema
               :commercialUse
             when 'The dataset may not be used for any purpose beyond explicit permissions',
                  'The dataset may not be used for any purposes beyond explicit permissions'
               # NOTE: this is not really a prohibition, for the moment we model it as a constraint on an
               # existing permission to researchUse but only if that permission is present
               if policy[:permission] && policy[:permission][:researchUse]
                 policy[:permission][:researchUse] << 'This dataset may only be used for the approved purpose'
               end
               next # Prevents a prohibition from being added for this one
             when 'The dataset may not be sold'
               :sell
             else
               raise "Encountered unknown prohibition: #{a[:value]}"
             end
    policy[:prohibition][action] = true
  end
  answer_set.select { |a| a[:type] == :freetext }.each do |a|
    question_text = " for question '#{question}'" if question
    puts "Cannot capture freetext answer '#{a[:value]}'#{question_text}"
  end
end

# Utility method to translate rule questionnaire response content to schema constructs
def create_policy(dataset, policy_data)

  policy = dataset.policies.find_or_create_by(name: policy_data[:name], type: policy_data[:type])

  policy_data[:prohibition]&.each do |action, _|
    rule = policy.rules.find_or_create_by(type: 'Prohibition', action: action)
  end

  policy_data[:permission]&.each do |action, conditions|

    rule = policy.rules.find_or_create_by(type: 'Permission', action: action)

    rule.add_party('assigner', policy_data[:assigner]) if policy_data[:assigner]
    rule.add_party('assignee', policy_data[:assignee]) if policy_data[:assignee]
    
    conditions.each do |condition|
      case condition
      when 'The dataset may only be linked with the approval of the IRB of record'
        duty = rule.duties.find_or_create_by(type: 'Duty', action: 'obtainApproval')
        duty.add_party('assigner', 'IRB')
        duty.add_party('assignee', 'DataRequester')
      when 'The dataset may only be linked with the approval of data contributing sites'
        duty = rule.duties.find_or_create_by(type: 'Duty', action: 'obtainApproval')
        duty.add_party('assigner', 'DataProvider')
        duty.add_party('assignee', 'DataRequester')
      when 'The dataset may only be linked using a specific linkage method'
        rule.constraints.find_or_create_by(left_operand: 'linkageMethod', operator: 'eq', right_operand: 'ApprovedProtocol')
      when 'The dataset may only be linked for specific types of research or use'
        rule.constraints.find_or_create_by(left_operand: 'purpose', operator: 'eq', right_operand: 'ApprovedPurpose')
      when 'The dataset may only be shared following the Safe Harbor de-identification method'
        rule.constraints.find_or_create_by(left_operand: 'deidentificationMethod', operator: 'eq', right_operand: 'SafeHarborMethod')
      when 'The dataset may only be shared as a de-identified dataset'
        rule.constraints.find_or_create_by(left_operand: 'output', operator: 'eq', right_operand: 'DeidentifiedDataset')
      when 'The dataset may only be shared if approved by a review body'
        duty = rule.duties.find_or_create_by(type: 'Duty', action: 'obtainApproval')
        duty.add_party('assigner', 'ReviewCommittee')
        duty.add_party('assignee', 'DataRequester')
      when 'The dataset may only be shared as a limited dataset'
        rule.constraints.find_or_create_by(left_operand: 'output', operator: 'eq', right_operand: 'LimitedDataset')
      when 'The dataset may only be shared within a defined data release process'
        duty = rule.duties.find_or_create_by(type: 'Duty', action: 'obtainApproval')
        duty.add_party('assigner', 'DataAccessCommittee')
        duty.add_party('assignee', 'DataRequester')
      when 'The dataset may only be accessed in a data enclave'
        rule.constraints.find_or_create_by(left_operand: 'virtualLocation', operator: 'eq', right_operand: 'DataEnclave')
      when 'The dataset may only be accessed in a controlled environment'
        rule.constraints.find_or_create_by(left_operand: 'virtualLocation', operator: 'eq', right_operand: 'ControlledAccess')
      when 'This dataset may only be used for the approved purpose',
           'This dataset may only be used for an approved purpose'
        rule.constraints.find_or_create_by(left_operand: 'purpose', operator: 'eq', right_operand: 'ApprovedPurpose')
      when 'This dataset may only be used for research on a specific topic'
        rule.constraints.find_or_create_by(left_operand: 'purpose', operator: 'eq', right_operand: 'ApprovedPurpose')
      else
        raise "Encountered unknown condition: #{condition}"
      end
    end

  end

  return policy
end

namespace :questionnaire_response do

  desc 'Import a questionnaire response to load a new dataset'
  task import: :environment do

    raise "Set the FILE environment variable to the response file name" unless ENV['FILE'] && File.exist?(ENV['FILE'])
    response = JSON.parse(File.read(ENV['FILE']))

    dataset = Dataset.new
    policies = []

    iterate_answers(response) do |answer_set, text_path, id_path|

      case id_path.last

      # Dataset Information
      when '183743825557'
        # Section 2: Dataset Information | Enter the name of the dataset
        dataset.name = answer_set.first[:value]
      when '950546914424'
        # Section 2: Dataset Information | Enter the name of the study that generated this dataset
        dataset.source = answer_set.first[:value]
      when '114604457786'
        # Section 2: Dataset Information | Select or enter the type of data in the dataset
        dataset.dataset_type = answer_set.map { |a| a[:value] }.join('/')
      when '2546053698501'
        # Section 2: Dataset Information | Enter the name of the organization that collected the dataset
        dataset.source_agency = answer_set.first[:value]
      when '5873078915818'
        # Section 2: Dataset Information | Enter the name of the organization(s) that funded the collection of this dataset
        # NOT PART OF SCHEMA
      when '2887181460133'
        # Section 2: Dataset Information | Enter the grant number for the collection of this dataset
        # NOT PART OF SCHEMA
      when '1231693955512'
        # Section 2: Dataset Information | Does this dataset contain Personally Identifiable Information (PII) for use in individual-level dataset linkage?
        # ONLY USED TO DRIVE QUESTIONNAIRE INTERACTION
      when '8973169287626'
        # Section 2: Dataset Information | Select which PII elements the dataset contains
        dataset.pii_elements = answer_set.map { |a| a[:value] }
      when '7144935539137'
        # Section 2: Dataset Information | Enter the organization that holds these PII elements.
        dataset.pii_elements_holder = answer_set.first[:value]
      when '2915010747847'
        # Section 2: Dataset Information | Select or enter the method used to de-identify the dataset
        # NOT PART OF SCHEMA
      when '541020208424'
        # Section 2: Dataset Information | Are identifiers accessible outside of the dataset to generate a pseudo-identifier (e.g., hash or token)?
        # NOT PART OF SCHEMA

      # Consent
      when '8556729531831'
        # Section 5: Consent | Were participants consented for the collection of this dataset?
        # NOTE: Consent is not given a name on the questionnaire
        policies << { type: 'Consent', name: "#{dataset.name} Consent" }
      when '6815025482067'
        # Section 5: Consent | Will minor participants be re-consented when they become adults?
        # TODO: Is there some way to capture this?
      when '6068373199492'
        # Section 5: Consent | Does the consent permit dataset linkage?
        add_permission(policies.last, :link, []) if answer_set.first[:value] == 'Yes'
      when '3260273564647'
        # Section 5: Consent | Select the dataset linkage conditions that the consent applies
        add_permission(policies.last, :link, answer_set, text_path.last)
      when '6555119758941'
        # Section 5: Consent | Select or enter the linkage method
        # CODED VALUE WHERE WE CANNOT REPRESENT ALL OPTIONS IN SCHEMA
        # PrivacyPreservingRecordLinkage matches PPRL option but nothing matches Clear text option
      when '6971920041595'
        # Section 5: Consent | Enter the specific type of research or use
        # FREETEXT THAT WE CAN'T CAPTURE IN SCHEMA
      when '2339168492096'
        # Section 5: Consent | Does the consent permit dataset sharing?
        add_permission(policies.last, :share, []) if answer_set.first[:value] == 'Yes'
      when '2011544460755'
        # Section 5: Consent | Select the dataset sharing conditions that the consent applies
        add_permission(policies.last, :share, answer_set, text_path.last)
      when '8941779115028'
        # Section 5: Consent | Describe the data release process
        # FREETEXT THAT WE CAN'T CAPTURE IN SCHEMA
      when '185229461783'
        # Section 5: Consent | Enter the name of the review body needed for approval for sharing
        # FREETEXT THAT WE CAN'T CAPTURE IN SCHEMA
      when '1527946970252'
        # Section 5: Consent | Does the consent permit secondary dataset access?
        add_permission(policies.last, :access, []) if answer_set.first[:value] == 'Yes'
      when '5586643922110'
        # Section 5: Consent | Select the secondary dataset access conditions that the consent applies
        add_permission(policies.last, :access, answer_set, text_path.last)
      when '3911763121085'
        # Section 5: Consent | Does the consent permit secondary dataset use?
        add_permission(policies.last, :researchUse, []) if answer_set.first[:value] == 'Yes'
      when '2381691106885'
        # Section 5: Consent | Select the secondary dataset use conditions that the consent applies
        add_permission(policies.last, :researchUse, answer_set, text_path.last)
      when '8858012060804'
        # Section 5: Consent | Enter the approved purpose
        # FREETEXT THAT WE CAN'T CAPTURE IN SCHEMA
      when '7558242293016'
        # Section 5: Consent | Select or enter the prohibitions
        add_prohibition(policies.last, answer_set, text_path.last)

      # Data Use Agreement
      when '4125493182474'
        # Section 7: Data Use Agreement (DUA) | Is a DUA required for dataset linkage, sharing, and secondary access and use?
        # ONLY USED TO DRIVE QUESTIONNAIRE INTERACTION
      when '223781945602'
        # Section 7: Data Use Agreement (DUA) | Enter the name of the DUA
        policies << { type: 'DataUseAgreement', name: answer_set.first[:value] }
      when '9068362173609'
        # Section 7: Data Use Agreement (DUA) | Select or enter the organization providing the dataset
        policies.last[:assigner] = answer_set.first[:value].gsub(/\s+/, '_').camelize # NOTE: fragile conversion from coded display value
      when '7082850387156'
        # Section 7: Data Use Agreement (DUA) | Select or enter the data receiving organization
        policies.last[:assignee] = answer_set.first[:value].gsub(/\s+/, '_').camelize # NOTE: fragile conversion from coded display value
      when '3104982951967'
        # Section 7: Data Use Agreement (DUA) | Does the DUA permit dataset linkage?
        add_permission(policies.last, :link, []) if answer_set.first[:value] == 'Yes'
      when '2924482557178'
        # Section 7: Data Use Agreement (DUA) | Select or enter the dataset linkage conditions that the DUA applies
        add_permission(policies.last, :link, answer_set, text_path.last)
      when '7767340558858'
        # Section 7: Data Use Agreement (DUA) | Enter the specific types of research or use
        # FREETEXT THAT WE CAN'T CAPTURE IN SCHEMA
      when '8305719280325'
        # Section 7: Data Use Agreement (DUA) | Select or enter the linkage method
        # CODED VALUE WHERE WE CANNOT REPRESENT ALL OPTIONS IN SCHEMA
        # PrivacyPreservingRecordLinkage matches PPRL option but nothing matches Clear text option
      when '5680396598662'
        # Section 7: Data Use Agreement (DUA) | Does the DUA permit dataset sharing?
        add_permission(policies.last, :share, []) if answer_set.first[:value] == 'Yes'
      when '747239942035'
        # Section 7: Data Use Agreement (DUA) | Select or enter the dataset sharing conditions that the DUA applies
        add_permission(policies.last, :share, answer_set, text_path.last)
      when '4231330513743'
        # Section 7: Data Use Agreement (DUA) | Enter the name of the review body needed for approval for sharing
        # FREETEXT THAT WE CAN'T CAPTURE IN SCHEMA
      when '2893828494843'
        # Section 7: Data Use Agreement (DUA) | Describe the data release process
        # FREETEXT THAT WE CAN'T CAPTURE IN SCHEMA
      when '7988868685992'
        # Section 7: Data Use Agreement (DUA) | Does the DUA permit secondary dataset access?
        add_permission(policies.last, :access, []) if answer_set.first[:value] == 'Yes'
      when '3092464118141'
        # Section 7: Data Use Agreement (DUA) | Select or enter the secondary dataset access conditions that the DUA applies
        add_permission(policies.last, :access, answer_set, text_path.last)
      when '3951496554078'
        # Section 7: Data Use Agreement (DUA) | Does the DUA permit secondary dataset use?
        add_permission(policies.last, :researchUse, []) if answer_set.first[:value] == 'Yes'
      when '3830935775250'
        # Section 7: Data Use Agreement (DUA) | Select or enter the secondary dataset use conditions that the DUA applies
        add_permission(policies.last, :researchUse, answer_set, text_path.last)
      when '6935441693758'
        # Section 7: Data Use Agreement (DUA) | Enter the approved purpose
        # FREETEXT THAT WE CAN'T CAPTURE IN SCHEMA
      when '9461228708300'
        # Section 7: Data Use Agreement (DUA) | Select or enter the prohibitions
        add_prohibition(policies.last, answer_set, text_path.last)
      else
        # This line can be used to help generate code for this importer for linkIds not yet supported
        puts "      when '#{id_path.last}'\n        # #{text_path.first} | #{text_path.last}"
      end

    end

    # Set up the policy in the database along with all the related rules
    dataset.save!
    policies.each { |policy| create_policy(dataset, policy) }
  end

  desc 'Convert a questionnaire response to CSV'
  task convert_csv: :environment do
    raise "Set the FILE environment variable to the response file name" unless ENV['FILE'] && File.exist?(ENV['FILE'])
    response = JSON.parse(File.read(ENV['FILE']))
    results = []
    iterate_answers(response) do |answer_set, text_path, id_path|
      results << [
        text_path.join('|'),
        answer_set.map { |a| a[:value] }.join('|'),
        answer_set.map { |a| a[:type] }.join('|')
      ]
    end
    puts ['Question Path', 'Answers', 'Answer Types'].to_csv
    results.each { |r| puts r.to_csv }
  end

end
