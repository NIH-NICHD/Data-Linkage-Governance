namespace :report do

  desc "Report on all editing sessions"
  task sessions: :environment do
    # Find all the users
    users = UserActivity.pluck(:user_email).uniq
    users.each do |user|
      # Find all times this user saved something
      create_paths = ['questionnaire_response/create', 'api/v1/questionnaire_response/create']
      update_paths = ['questionnaire_response/update', 'api/v1/questionnaire_response/update']
      saves = UserActivity.where(user_email: user, activity: create_paths + update_paths)
      puts "#{user}: #{saves.count} editing session#{'s' if saves.count != 1}"
      saves.order(:created_at).each do |save|
        # Figure out when they started the session; slightly different depending on whether it's a create or update
        initiation = if create_paths.include?(save.activity)
                       UserActivity.where(user_email: user, activity: 'questionnaire_response/new')
                         .where('created_at < ?', save.created_at)
                         .order('created_at').last
                     else
                       UserActivity.where(user_email: user, activity: 'questionnaire_response/edit',
                                          questionnaire_response_id: save.questionnaire_response_id)
                         .where('created_at < ?', save.created_at)
                         .order('created_at').last
                     end
        duration = save.created_at - initiation.created_at
        puts "  #{create_paths.include?(save.activity) ? 'Creation' : 'Update'} of '#{save.questionnaire_response.dataset_name}' (ID #{save.questionnaire_response.id}) started at #{initiation.created_at} and ended at #{save.created_at} (#{duration.round(1)} seconds)"
      end
    end
  end

end
