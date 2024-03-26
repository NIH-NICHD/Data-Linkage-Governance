# frozen_string_literal: true

namespace :utilities do

  desc 'Generate data dictionary template'
  task dictionary: :environment do
    [Dataset, PriorLinkage, Policy, Requirement, Rule, Constraint, Function, Party, PolicyCommentary, Source, DataLifecycle].each do |klass|
      puts "**#{klass.name}** - "
      klass.column_names.each do |col|
        if col == 'id'
          puts "  * #{col} - an identifier that uniquely identifies a #{klass.name.titleize.downcase}"
        elsif col == 'created_at'
          puts "  * #{col} - a timestamp indicating when a #{klass.name.titleize.downcase} entry was created"
        elsif col == 'updated_at'
          puts "  * #{col} - a timestamp indicating when a #{klass.name.titleize.downcase} entry was last updated"
        elsif col.end_with?('_id')
          puts "  * #{col} - a reference to the #{col.gsub('_id', '').split('_').join(' ')} associated with a #{klass.name.titleize.downcase} entry"
        else
          puts "  * #{col} - XYZ, e.g., #{klass.order(:id).all[1][col]}"
        end
      end
      puts
    end
  end

  desc 'Populate manually with some data'
  task populate: :environment do

    collection_data_lifecycle = DataLifecycle.create(name: 'Data Collection')
    linkage_data_lifecycle = DataLifecycle.create(name: 'Data Linkage')
    access_data_lifecycle = DataLifecycle.create(name: 'Data Access')

    # TODO: information sources doesn't really seem to be a property of the dataset itself?
    dataset = Dataset.create(name: 'NHANES',
                             source: 'National Health and Nutrition Examination Survey (NHANES)',
                             source_agency: 'CDC',
                             dataset_type: 'Survey/Clinical',
                             information_sources: ['Website', 'NCHS, DHANES, and RDC staff', 'NHANES linkage info document'])

    # PriorLinkage
    # PiiElement

    #### Assent permits collection

    policy = Policy.create(name: 'Assent',
                           type: 'Agreement',
                           dataset: dataset)

    # TODO: Should source be on the policy or on the policy commentary?
    source = Source.create(name: 'NHANES Child Assent Form',
                           link: 'https://wwwn.cdc.gov/nchs/data/nhanes/2019-2020/documents/2016-Child-Assent-7-11-Form-508.pdf',
                           accessed_on: '2023-04-17')

    policy_commentary = PolicyCommentary.create(language: 'Your parents say that you can take part in this special survey. You have just read about the survey in this book. The survey tells us about the health of people. We will ask you to have an exam at our vans that are here in your town. This exam is a little like going to the doctor. Other kids and their families will be at the center. You do not have to do this if you do not want to. You can also stop at any time and you do not have to do any tests that you do not want to. If you take part, you will learn some things about yourself. You will help us learn a lot about other kids in the United States.',
                                            policy: policy,
                                            source: source,
                                            data_lifecycle: collection_data_lifecycle)

    assigner = Party.create(name: 'Child')
    assignee = Party.create(name: 'NHANES')

    rule = Rule.create(type: 'Permission',
                       policy_commentary: policy_commentary,
                       action: 'collect',
                       interpretation: 'Assent from children authorizes data collection',
                       assigner: assigner,
                       assignee: assignee)

    #### Consent permits linkage
    
    policy = Policy.create(type: 'Agreement',
                           name: 'Consent',
                           dataset: dataset)

    source = Source.create(name: 'NHANES Home Interview Consent',
                           link: 'https://wwwn.cdc.gov/nchs/data/nhanes/2019-2020/documents/2019-Home-Interview-Consent-English-508.pdf',
                           accessed_on: '2023-04-17')

    # TODO: Consider supportin markdown in the language field?
    policy_commentary = PolicyCommentary.create(language: 'Health research using NHANES can be enhanced by combining your survey records with other data sources. The data gathered are used to link your answers to vital statistics, health, nutrition, and other related records. “We can do additional health research by linking the interview and exam data of everyone listed under “SP NAME” in the gray box below to vital statistics, health, nutrition, and other related records. May we try to link these survey records with other records? _ Yes _ No _ N/A.',
                                            policy: policy,
                                            source: source,
                                            data_lifecycle: linkage_data_lifecycle)

    assigner = Party.create(name: 'Adult')
    # Assignee stays the same
    # assignee = Party.create(name: 'NHANES')

    rule = Rule.create(type: 'Permission',
                       policy_commentary: policy_commentary,
                       action: 'link',
                       interpretation: 'Consent from adults authorizes data linkage',
                       assigner: assigner,
                       assignee: assignee)
    
    #### Access only permitted in an enclave

    dataset = Dataset.create(name: 'Monitoring the Future (MTF)',
                             source: 'National Addiction and HIV Data Archive Program (NAHDAP)',
                             source_agency: 'Funded by NIDA, conducted by Survey Research Center in the Institute for Social Research at the University of Michigan ',
                             dataset_type: 'Survey (2017-2021)',
                             information_sources: ['U-Mich Legal meeting', 'NAHDAP staff meeting', 'MTF team email communication', 'website'])

    # PriorLinkage
    # PiiElement

    # TODO: This is not quite right, where does the policy come from that asserts the access restriction must be in the data use agreement?
    policy = Policy.create(type: 'Agreement',
                           name: 'NAHDAP Data Use Agreement',
                           dataset: dataset)

    source = Source.create(name: 'NAHDAP Meeting')

    policy_commentary = PolicyCommentary.create(language: 'There is a NAHDAP-specific RDUA that is used for MTF, which is tailored for accessing data through the VDE; this RDUA also includes data use specifications.',
                                          policy: policy,
                                          source: source,
                                          data_lifecycle: access_data_lifecycle)

    assigner = Party.create(name: 'NAHDAP')
    assignee = Party.create(name: 'Data Requestor')

    rule = Rule.create(type: 'Permission',
                       policy_commentary: policy_commentary,
                       action: 'access',
                       interpretation: 'NAHDAP Restricted Data Use Agreement for Restricted Data in the Virtual Data Enclave (NAHDAP VDE RDUA) authorizes data access',
                       assigner: assigner,
                       assignee: assignee)

    constraint = Constraint.create(left_operand: 'dataset access location',
                                   operator: 'eq',
                                   right_operand: 'enclave',
                                   rule: rule)

  end

  desc 'Print JSON examples'
  task examples: :environment do
    [Dataset, Policy, PolicyCommentary, Source, Rule, Party, Constraint].each do |klass|
      puts klass.name
      # puts '=' * klass.name.length
      puts
      puts JSON.pretty_generate(klass.last.as_json)
      puts
    end
  end

end
