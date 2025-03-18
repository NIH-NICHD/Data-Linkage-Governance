require "test_helper"

class Api::V1::QuestionnaireControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_questionnaire_index_url
    assert_response :success
  end
end
