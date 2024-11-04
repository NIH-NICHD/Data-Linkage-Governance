class ApplicationController < ActionController::Base

  protect_from_forgery with: :null_session

  before_action :log_user_actions

  protected

  # Grab the requested questionnaire for the current user
  def set_questionnaire_response
    # Response can be identified via two IDs
    @questionnaire_response = QuestionnaireResponse.where(user_email: user_email).find(params[:questionnaire_response_id] || params[:id])
  end

  # Retrieve the user email from the request headers, or use the user's ID in development
  def user_email
    if Rails.env.development?
      ENV['USER_EMAIL'] || "#{Etc.getlogin}@example.org"
    else
      raise "No user email address found in headers" unless request.headers['warp-user']
      request.headers['warp-user']
    end
  end

  # Log all user actions
  def log_user_actions
    # Response can be identified via two IDs, if present
    response_id = params[:questionnaire_response_id] || params[:id]
    # Make sure a user can't log an activity for a response they don't have access to
    if response_id && !QuestionnaireResponse.where(user_email: user_email, id: response_id).exists?
      raise "Action cannot be logged for response without access"
    end
    # Log the activity
    @user_activity = UserActivity.create(user_email: user_email, activity: "#{controller_path}/#{action_name}", questionnaire_response_id: response_id)
  end

  # Get the current version and date of the questionnaire; requires loading up the JSON file of the questionnaire
  def questionnaire_version_and_date
    questionnaire_path = Rails.root.join('app', 'frontend', 'components', 'Questionnaire', 'Research-data-metadata.R4.json')
    questionnaire = JSON.parse(File.read(questionnaire_path))
    return "Questionnaire v#{questionnaire['version']} (#{questionnaire['date']})"
  rescue
    # In case something goes wrong we still want to proceed with anything else we were doing
    return 'Questionnaire version unknown'
  end

end
