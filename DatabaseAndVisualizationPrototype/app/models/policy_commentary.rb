class PolicyCommentary < ApplicationRecord
  belongs_to :rule
  belongs_to :data_lifecycle
  has_many :sources
  has_one :policy, through: :rule
  has_one :dataset, through: :policy
end
