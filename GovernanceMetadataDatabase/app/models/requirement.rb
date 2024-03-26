class Requirement < ApplicationRecord
  belongs_to :requiring_policy, class_name: 'Policy', foreign_key: :requiring_policy_id
  belongs_to :required_policy, class_name: 'Policy', foreign_key: :required_policy_id
end
