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
