class Api::V1::QuestionnaireResponseController < ApplicationController

  before_action :set_questionnaire_response, only: [:show, :update]

  def show
    render json: @questionnaire_response
  end

  def create
    resource = JSON.parse(request.raw_post)
    questionnaire_response = QuestionnaireResponse.new(user_email: user_email, dataset_name: dataset_name, resource: resource)
    if questionnaire_response.save
      # Update the UserActivity with the ID of the just-saved response
      @user_activity.update(questionnaire_response: questionnaire_response)
      render json: questionnaire_response, status: :created
    else
      render json: questionnaire_response.errors, status: :unprocessable_entity
    end
  end

  def update
    resource = JSON.parse(request.raw_post)
    if @questionnaire_response.update(dataset_name: dataset_name, resource: resource)
      render json: @questionnaire_response
    else
      render json: @questionnaire_response.errors, status: :unprocessable_entity
    end
  end

  private

  def find_section_for_linkid(response, linkid)
    sections = [response]
    while sections.length > 0
      section = sections.pop
      return section if section&.[](:linkId) == linkid
      sections += section&.[](:item) if section&.[](:item)
    end
    return nil
  end

  # Pull out the dataset name from params, which contains the parsed JSON of the FHIR QuestionnaireResponse resource
  def dataset_name
    # TODO: This is fragile and will break if the questionnaire questions change, use an extension instead
    name_section = find_section_for_linkid(params, '183743825557')
    dataset_name = name_section&.[](:answer)&.detect { |a| a[:valueString] }&.[](:valueString)
    return dataset_name || '<unnamed dataset>'
  end

end
