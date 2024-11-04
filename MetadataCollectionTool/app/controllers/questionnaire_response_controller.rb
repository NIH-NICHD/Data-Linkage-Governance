class QuestionnaireResponseController < ApplicationController

  before_action :set_questionnaire_response, only: [:transfer_edit, :transfer_update]

  # Some actions just have views that set up the JS form

  def new
    render layout: 'questionnaire'
  end

  def edit
    render layout: 'questionnaire'
  end

  # Two actions for transfering a response to another user

  def transfer_edit
    @user_emails = UserActivity.pluck(:user_email).uniq.sort
  end

  def transfer_update
    raise "Unknown user selected for transfer" unless UserActivity.where(user_email: params[:questionnaire_response][:user_email]).exists?
    @questionnaire_response.update(user_email: params[:questionnaire_response][:user_email])
    redirect_to root_path
  end

end
