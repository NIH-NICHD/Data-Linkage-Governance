class HomeController < ApplicationController

  def index
    # We show the version and date of the latest questionnaire at the top
    @questionnaire_version_and_date = questionnaire_version_and_date
    # We display the user's email
    @user_email = user_email
    # We show all the responses they have access to
    @responses = QuestionnaireResponse.where(deleted: false, user_email: @user_email).order(:updated_at).reverse()
    # We also want to show all the responses they've ever accessed that they don't currently have access to
    accessed_ids = UserActivity.where(user_email: user_email).select(:questionnaire_response_id).distinct.pluck(:questionnaire_response_id).compact
    @historical_responses = QuestionnaireResponse.where(deleted: false, id: accessed_ids - @responses.pluck(:id))
    @deleted_responses = QuestionnaireResponse.where(deleted: true, user_email: @user_email).order(:updated_at).reverse()
  end

end
