# Based on some ideas from https://gist.github.com/hopsoft/56ba6f55fe48ad7f8b90
namespace :db do

  LOCATION = File.join(Rails.root, 'backups')
  DATE_FORMAT = '%Y_%m_%d__%H_%M_%S'

  desc "Dump the database to backups/<APP_NAME>_<DATETIME>.dump"
  task :dump => :environment do
    with_config do |app, host, db, user|
      datetime = DateTime.now.strftime(DATE_FORMAT)
      filename = File.join(LOCATION, "#{app}_#{datetime}.dump")
      cmd = "pg_dump --host #{host} --username '#{user}' --verbose --clean --no-owner --no-acl --format=c #{db} > #{filename}"
      puts cmd
      exec cmd
    end
  end

  desc "Restore the database from backups/<APP_NAME>_<DATETIME>.dump using the date from the DATETIME environment variable"
  task :restore => :environment do
    with_config do |app, host, db, user|
      # Use environment variable for the date (just look at the files to find a valid one)
      datetime = ENV['DATETIME']
      raise "Datetime must be provided using the DATETIME environment variable (YY_MM_DD__HH_MM_SS)" unless datetime
      filename = File.join(LOCATION, "#{app}_#{datetime}.dump")
      # Make sure the file is present before dropping the existing database
      raise "Database backup file '#{filename}' not found" unless File.exists?(filename)
      Rake::Task["db:drop"].invoke
      Rake::Task["db:create"].invoke
      cmd = "pg_restore --verbose --host #{host} --username '#{user}' --clean --no-owner --no-acl --dbname #{db} #{filename}"
      puts cmd
      exec cmd
    end
  end

  desc 'Prune database dumps to keep daily dumps for the last month and weekly dumps before that'
  task :prune_dumps => :environment do
    puts "Pruning database dumps"
    def file_time(filename)
      return unless match = filename.match(/_([0-9_]+).dump/)
      Time.strptime(match[1], DATE_FORMAT)
    end
    path = File.join(LOCATION, '*.dump')
    # Get list of matching files where we can determine the time from the filename and sort by time
    files = Dir.glob(path).select { |f| file_time(f) }.sort_by { |f| file_time(f) }
    # File from older than past month, keep most recent weekly
    files.select { |f| file_time(f) < 1.month.ago }.group_by { |f| file_time(f).strftime('%Y week %V') }.each do |week, ff|
      sorted = ff.sort_by { |f| file_time(f) }
      sorted[0..-2].each do |f|
        puts "Deleting #{f}"
        File.delete(f)
      end
      puts "Keeping #{sorted.last}"
    end
    # Files from past month, keep most recent daily
    files.select { |f| file_time(f) >= 1.month.ago }.group_by { |f| file_time(f).strftime('%Y-%m-%d') }.each do |day, ff|
      sorted = ff.sort_by { |f| file_time(f) }
      sorted[0..-2].each do |f|
        puts "Deleting #{f}"
        File.delete(f)
      end
      puts "Keeping #{sorted.last}"
    end
  end

  private

  def with_config
    yield Rails.application.class.module_parent_name.underscore,
          ActiveRecord::Base.connection_db_config.configuration_hash[:host] || 'localhost',
          ActiveRecord::Base.connection_db_config.configuration_hash[:database],
          ActiveRecord::Base.connection_db_config.configuration_hash[:username]
  end

end
