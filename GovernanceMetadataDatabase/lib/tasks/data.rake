# frozen_string_literal: true

# Pull out distinct sections within a cell, if present, and remove any leading or trailing whitespace
def subcells(cell)
  # Sections are differentiated with a ----- separator, and we ignore the first section so that cells can keep some local annotation
  sections = cell.to_s.split(/\s*#####\s*/)
  if sections.size > 1
    return sections[1..]
  else
    return [cell&.strip]
  end
end

# Pre-process the data in a row to pull out multiple concepts if present
def preprocess_data_row(cells)
  # Remove anything that looks like a footnote: [number]
  cells.map! { |field| field&.gsub(/ *\[[0-9]+\] */, '') }
  # Look for cells in each row with multiple sections; that means the row represents multiple concepts. If a
  # cell has one section that means the contents apply to all the concepts. There should not be a mismatch in
  # the number of concepts between cells that express multiple
  sections = cells.map { |field| subcells(field) }
  # If no cells have multiple sections just return the cells as a single row
  return [sections.map(&:first)] if sections.all? { |n| n.length == 1 }
  # Pull out field counts that are not 1 to see if there are any mismatches in sizes
  counts = sections.reject { |n| n.length == 1 }.map { |n| n.length }
  if counts.uniq.length != 1
    raise "ERROR: Count mismatch: #{counts.inspect}\n\n#{cells.inspect}\n\n#{sections.inspect}"
    # return [cells] # Just return the overall sections so we can continue
  end
  count = counts.uniq.first
  # Return results split into separate rows for each concept, mapping cells with one section to all concepts
  return sections.map { |n| n.length == count ? n : n * count }.transpose
end

# Turn annotations into key/value pairs; there is one key and value per line, using a colon to separate
def extract_annotations(cell)
  key_values = {}
  cell.to_s.split(/\n+/).each do |annotation|
    # Make sure we can have colons in the values
    key, *value = annotation.split(/\s*:\s*/)
    puts "  WARNING: Already have a key/value for #{key}\n#{cell.inspect}" if key_values[key]
    key_values[key] = value.join(':').strip if value.length > 0
  end
  return key_values
end

# Process sources to handle multiple sources (one per line) and annotated links, which look like
# http://url/ (Accessed: <date>)
def extract_sources(cell)
  return cell.to_s.strip.split(/\n+/).map do |row|
    if link_info = row.to_s.match(/(https?:\/\/[^\s]+)\s+\(Accessed: ([0-9\/]+)\)/)
      { 'link' => link_info[1], 'accessed' => link_info[2] }
    else
      # Not a link, so just return the text as the name of the source
      { 'name' => row }
    end
  end
end

namespace :data do

  # TODO: There is some crossed out data in the spreadsheet; document that we will be deleting it?

  desc 'Load data from the use cases spreadsheet'
  task load: :environment do

    # TODO: Consider breaking this out into a library

    # Load data from an annotated spreadsheet that's included as part of the project
    filename = Rails.root + 'datafiles/Use_Cases_Governance_Information_MAIN_11-28-23_ANNOTATED.xlsx'
    data = Creek::Book.new(filename)

    # Identify the sheet names for all the datasets we wish to import data for
    dataset_sheet_names = ['UC1 - NHANES', 'UC1 - NSDUH', 'UC1 - MTF', 'UC1 - AFCARS',
                           'UC2 - NCCR', 'UC2 - CDC COVID', 'UC2 - T-MSIS',
                           'UC3 - N3C', 'UC3 - PEDSnet', 'UC3 - RADx-UP', 'UC3 - EPA']

    # Allow a single sheet to be loaded based on a regexp
    dataset_sheet_names = dataset_sheet_names.grep(/#{ENV['SHEET']}/) if ENV['SHEET']

    # Grab the sheets themselves for these datasets
    sheets = dataset_sheet_names.map { |name| data.sheets.detect { |s| s.name == name } }

    # Mapping from lifecycle to action
    lifecycle_actions = {
      'Data Collection' => 'collect',
      'Data Linkage' => 'link',
      'Data Sharing' => 'share',
      'Data Access' => 'access',
      'Data Use' => 'researchUse'
    }

    allowed_annotations = %w(action constraint_left constraint_operator constraint_right duty
                             policy policy_type prohibition obligation requires)
    allowed_annotations += Function::TYPES
    allowed_annotations += Function::TYPES.map { |function| 'duty_' + function }

    # Import data from each sheet
    sheets.each do |sheet|

      # We track policies requiring other policies and tie them together at the end
      policy_requirements = []

      # Each sheet has dataset information in the same place
      name = sheet.rows.drop(2).first["A3"].sub(/Dataset [0-9]+ - /, '')
      puts "Importing data for #{name}"
      dataset = Dataset.find_or_create_by(name: name) do |d|
        d.source = sheet.rows.drop(3).first['C4']
        d.source_agency = sheet.rows.drop(4).first['C5']
        d.dataset_type = sheet.rows.drop(5).first['C6']
        d.information_sources = sheet.rows.drop(6).first['C7'].split(/;\s+/)
      end

      # Go through each row looking for sections of data that we want to process
      section = :none
      lifecycle = nil
      sheet.rows.each do |row|

        # The row type is consistently the second cell
        row_type = row.values[1].to_s.squish

        # Handle each row to either change the section and lifecycle or process data
        if lifecycle_actions[row_type]

          # If it's a lifecycle row we set the section and change the current lifecycle
          section = :lifecycle
          lifecycle = row_type

        elsif (row_type == 'PII Elements')

          # If we hit the PII elements row we change to that section from whatever section we were in
          section = :pii_elements

        elsif (row_type == 'Prior Data Linkages' || row_type == 'Prior Data Linkaages')

          # If we hit the Prior Data Linkages row we change to that section from whatever section we were in
          section = :prior_data_linkages

        elsif (section == :lifecycle)

          # If we're in a lifecyce section we enter that data as policies and rules

          # Process the cells in this row so that, if a row matches multiple concepts, we get data for each concept separately
          preprocess_data_row(row.values).each do |_, _, language, interpretation, source, annotations|

            # Process any annotated data and pull out any structured source info
            annotations = extract_annotations(annotations)
            sources = extract_sources(source)

            unknown_annotations = annotations.keys - allowed_annotations
            raise "Encountered unknown annotation(s) \"#{unknown_annotations.join(' ')}\" on #{dataset.name}" unless unknown_annotations.empty?

            # If there is no policy annotated, that means there's no data in this row that we care about
            next unless annotations['policy']

            # Create the policy or find an existing matching one
            raise "No policy type provided for #{annotations['policy']} on #{dataset.name}" unless annotations['policy_type']
            policy_type = annotations['policy_type'].camelize
            puts "  WARNING: Unknown policy type #{policy_type} found" unless Policy::TYPES.include?(policy_type)
            policy = dataset.policies.find_or_create_by(name: annotations['policy'], type: policy_type)

            # See if this policy requires any other policies; we just track these until the end of this dataset
            # so that we can require policies that have not been defined yet
            if annotations['requires']
              annotations['requires'].split(/,\s*/).each do |requirement|
                policy_requirements << { requiring_policy: policy, required_policy_name: requirement }
              end
            end

            # Create rule (permission or prohibition or duty/obligation) or find existing matching ones
            # Note: Action can be explicit in spreadsheet or implicit based on section
            if ((annotations['action'] && annotations['prohibition']) ||
                (annotations['action'] && annotations['obligation']) ||
                (annotations['prohibition'] && annotations['obligation']))
              raise "Cannot have conflicting permission/probibition/obligation in the same segment"
            end
            rule = if annotations['prohibition']
                     action = annotations['prohibition'].camelize.downcase_first
                     puts "  WARNING: Unknown action #{action} found" unless Rule::ACTIONS.include?(action)
                     policy.rules.find_or_create_by(action: action, type: 'Prohibition')
                   elsif annotations['obligation']
                     # ORDL duty is referred to as obligation if directly on policy and duty if associated with a permission
                     action = annotations['obligation'].camelize.downcase_first
                     puts "  WARNING: Unknown action #{action} found" unless Rule::ACTIONS.include?(action)
                     policy.rules.find_or_create_by(action: action, type: 'Duty')
                   else
                     action = (annotations['action'] || lifecycle_actions[lifecycle]).camelize.downcase_first
                     puts "  WARNING: Unknown action #{action} found" unless Rule::ACTIONS.include?(action)
                     policy.rules.find_or_create_by(action: action, type: 'Permission')
                   end
            Function::TYPES.each do |function|
              if annotations[function]
                party = annotations[function].camelize
                puts "  WARNING: Unknown party type #{party}" unless Party::TYPES.include?(party)
                assigned_policy_types = ['Consent', 'Determination', 'Law', 'Policy', 'Certification', 'IRBDocumentation', 'Request']
                if ['assigner', 'assignee'].include?(function) && !assigned_policy_types.include?(policy.type)
                  puts "  WARNING: #{function} seen with #{policy.type} but is typically only used with #{assigned_policy_types.to_sentence}"
                end
                rule.add_party(function.camelize.downcase_first, party)
              end
            end
            if annotations['constraint_left'] && annotations['constraint_operator'] && annotations['constraint_right']
              constraint_left = annotations['constraint_left'].camelize.downcase_first
              constraint_operator = annotations['constraint_operator'].camelize.downcase_first
              constraint_right = annotations['constraint_right'].camelize
              puts "  WARNING: Unknown left operand #{constraint_left}" unless Constraint::LEFT_OPERANDS.include?(constraint_left)
              puts "  WARNING: Unknown operator #{constraint_operator}" unless Constraint::OPERATORS.include?(constraint_operator)
              puts "  WARNING: Unknown right operand #{constraint_right}" unless Constraint::RIGHT_OPERANDS.include?(constraint_right)
              constraint = rule.constraints.find_or_create_by(left_operand: constraint_left,
                                                              operator: constraint_operator,
                                                              right_operand: constraint_right)
            elsif annotations['constraint_left'] || annotations['constraint_operator'] || annotations['constraint_right']
              puts "  WARNING: incomplete constraint found"
            end

            # A rule might have a duty as a sub-rule
            if annotations['duty']
              duty = rule.duties.find_or_create_by(action: annotations['duty'], type: 'Duty')
              Function::TYPES.each do |function|
                if annotations['duty_' + function]
                  party = annotations['duty_' + function].camelize
                  puts "  WARNING: Unknown party type #{party}" unless Party::TYPES.include?(party)
                  duty.add_party(function.camelize.downcase_first, party)
                end
              end
            end

            # Create the lifecycle or find the existing one
            data_lifecycle = DataLifecycle.find_or_create_by(name: lifecycle)

            # Find or create the commentary on the rule
            commentary = rule.policy_commentaries.find_or_create_by(language: language, interpretation: interpretation, data_lifecycle: data_lifecycle)

            # Create the sources or find existing matching ones
            sources.each do |source|
              commentary.sources.find_or_create_by(name: source['name'], link: source['link']) do |s|
                s.accessed_on = Date.strptime(source['accessed'], "%m/%d/%y") if source['accessed']
              end
            end

          end

        elsif (section == :pii_elements)

          # If we're in the PII elements section we pull in data from three rows and save it on the dataset
          if (row_type == 'PII elements collected')
            elements_text = row.values[3]
            elements_text = elements_text.gsub(/^.* collects /, '')
            elements_text = elements_text.gsub(/ are collected.*$/, '')
            elements_text = elements_text.gsub(/ are available.*$/, '')
            elements_text = elements_text.gsub(/information not available\/found/i, '')
            dataset.update(pii_elements: elements_text.split(/, and |,/).map { |e| e.squish.downcase.gsub(/\.$/, '') })
          elsif (row_type.match /^PII elements holder/)
            dataset.update(pii_elements_holder: row.values[3].gsub(/\.$/, '').squish)
          elsif (row_type.match /^Use of common data model/)
            dataset.update(common_data_model: row.values[3].gsub(/\.$/, '').squish)
          end

        elsif (section == :prior_data_linkages)
          # Because this data is so unstructured in the spreadsheet we just put it all in annotations
          preprocess_data_row(row.values).each do |_, _, _, _, _, annotations|
            annotations = extract_annotations(annotations)
            next unless annotations['name']
            dataset.prior_linkages.find_or_create_by(dataset_name: annotations['name']) do |l|
              l.dataset_type = annotations['type']
              l.dataset_source = annotations['source']
              l.methodology = annotations['methodology']
              l.pii_elements = annotations['pii_elements'].to_s.strip.split(/,\s*/)
              l.entity_resolver = annotations['entity_resolver']
              l.performing_party = annotations['performing_party']
              l.quality_assessment = annotations['quality_assessment']
              l.data_sharing_method = annotations['data_sharing_method']
            end
          end
        end
      end

      # Now that we've gone through all the rows tie together the policies that require each other
      policy_requirements.each do |requirement|
        required_policy = Policy.where(name: requirement[:required_policy_name]).first
        raise "Cannot find required policy #{requirement[:required_policy_name]}" unless required_policy
        Requirement.find_or_create_by(requiring_policy: requirement[:requiring_policy], required_policy: required_policy)
      end

    end
  end

  desc 'Clear all loaded data from the database without having to drop and recreate the tables'
  task clear_all: :environment do
    klasses = [Constraint, DataLifecycle, Dataset, Function, Party, Policy, PolicyCommentary, PriorLinkage, Requirement, Rule, Source]
    klasses.each do |klass|
      puts "Deleting all data of type #{klass}"
      klass.delete_all
      # We also want to reset the ID counts so everything starts with repeatable IDs when loading
      # Note: this only works with PostgreSQL
      klass.connection.execute("ALTER SEQUENCE #{klass.table_name}_id_seq RESTART WITH 1")
    end
  end

  # See if there are different versions of the same concept with different capitalizations, etc
  def check_for_overlaps(concepts)
    grouped = concepts.group_by { |c| c.camelize.downcase }
    return grouped.values.select { |instances| instances.length > 1 }
  end

  desc 'Check data loaded from the use cases spreadsheet'
  task check: :environment do
    # List out policy types, actions, left operands, operators, right operands, functions, and parties,
    # flagging any slightly different versions
    policy_types = Policy.pluck(:type).uniq.sort
    puts "Policy types:\n#{policy_types.join("\n")}"
    check_for_overlaps(policy_types).each do |overlap|
      puts "\n    Near matching policy type: #{overlap.join(', ')}"
    end

    puts

    # Also check if there are any policies that are defined with multiple types
    Policy.all.group_by(&:name).each do |policy_name, policy_group|
      types = policy_group.map(&:type).uniq
      if types.length > 1
        puts "Policy \"#{policy_name}\" appears with types: #{types.join(', ')}"
      end
    end

    puts

    actions = Rule.pluck(:action).uniq.sort
    puts "Actions:\n#{actions.join("\n")}"
    check_for_overlaps(actions).each do |overlap|
      puts "\n    Near matching action: #{overlap.join(', ')}"
    end

    puts

    parties = Party.pluck(:name).uniq.sort
    puts "Parties:\n#{parties.join("\n")}"
    check_for_overlaps(parties).each do |overlap|
      puts "\n    Near matching parties: #{overlap.join(', ')}"
    end

    puts

    functions = Function.pluck(:type).uniq.sort
    puts "Functions:\n#{functions.join("\n")}"
    check_for_overlaps(functions).each do |overlap|
      puts "\n    Near matching functions: #{overlap.join(', ')}"
    end

    puts

    lefts = Constraint.pluck(:left_operand).uniq.sort
    puts "Left operands:\n#{lefts.join("\n")}"
    check_for_overlaps(lefts).each do |overlap|
      puts "\n    Near matching left operands: #{overlap.join(', ')}"
    end

    puts

    operators = Constraint.pluck(:operator).uniq.sort
    puts "Operators:\n#{operators.join("\n")}"
    check_for_overlaps(operators).each do |overlap|
      puts "\n    Near matching operators: #{overlap.join(', ')}"
    end

    puts

    rights = Constraint.pluck(:right_operand).uniq.sort
    puts "Right operands:\n#{rights.join("\n")}"
    check_for_overlaps(rights).each do |overlap|
      puts "\n    Near matching right operands: #{overlap.join(', ')}"
    end


  end

  # Fix up the row alignment by adding nils to the end of shorter rows
  def fixup_rows(row1, row2)
    if row1.length == row2.length
      return [row1, row2]
    elsif row1.length < row2.length
      fixup_rows(row2, row1).reverse
    else
      # If we're here row2 is shorter than row1
      row1.keys[row2.length, row1.length - row2.length].each do |key|
        row2[key] = nil
      end
      return [row1, row2]
    end
  end

  desc 'Compare annotated spreadsheet to the original spreadsheet and create a markdown document noting the changes'
  task compare: :environment do
    Diffy::Diff.default_format = :html
    puts '<style>'
    puts Diffy::CSS
    puts '</style>'
    puts
    original = Rails.root + 'datafiles/Use_Cases_Governance_Information_MAIN_11-28-23_ORIGINAL.xlsx'
    annotated = Rails.root + 'datafiles/Use_Cases_Governance_Information_MAIN_11-28-23_ANNOTATED.xlsx'
    original_data = Creek::Book.new(original)
    annotated_data = Creek::Book.new(annotated)
    # Assumes that there is a 1-1 mapping of sheets
    original_data.sheets.zip(annotated_data.sheets).each do |original_sheet, annotated_sheet|
      raise "Sheet mismatch! #{original_sheet.name} != #{annotated_sheet.name}" if original_sheet.name != annotated_sheet.name
      puts "# #{original_sheet.name}"
      diffs = 0
      original_sheet.rows.zip(annotated_sheet.rows).each do |original_row, annotated_row|
        # Fix up the row alignment by adding nils to the end of shorter rows
        original_row, annotated_row = fixup_rows(original_row, annotated_row)
        original_row.zip(annotated_row).each do |(original_cell, original_value), (annotated_cell, annotated_value)|
          raise "Cell mismatch: #{original_cell} != #{annotated_cell}" if original_cell != annotated_cell
          if original_value != annotated_value
            diffs += 1
            puts
            puts "## Cell #{original_cell} has changed"
            puts
            puts Diffy::Diff.new(original_value, annotated_value)
            puts
            #puts
            #puts "## Cell #{original_cell} has changed"
            #puts
            #puts (original_value || '[BLANK]').gsub(/^/, '>')
            #puts
            #puts "was changed to"
            #puts
            #puts (annotated_value || '[BLANK]').gsub(/^/, '>')
            #puts
          end
        end
      end
      if diffs == 0
        puts
        puts "No changes"
        puts
      end
    end
  end
end
