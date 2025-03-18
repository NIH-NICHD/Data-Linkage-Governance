class UserActivity < ApplicationRecord
    belongs_to :questionnaire_response, optional: true
end
