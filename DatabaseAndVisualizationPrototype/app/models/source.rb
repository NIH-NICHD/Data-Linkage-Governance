class Source < ApplicationRecord
  belongs_to :policy_commentary
  has_many :policies, through: :policy_commentaries
  has_many :datasets, through: :policies
end
