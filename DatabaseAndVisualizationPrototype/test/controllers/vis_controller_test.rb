require "test_helper"

class VisControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get vis_index_url
    assert_response :success
  end
end
