class QuestionnaireResponse < ApplicationRecord
    validates :dataset_name, presence: true
    validates :resource, presence: true
    has_many :user_activities 
end
