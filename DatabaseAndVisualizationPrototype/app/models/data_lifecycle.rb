class DataLifecycle < ApplicationRecord
  has_many :policy_commentaries
  has_many :policies, through: :policy_commentaries
end
