class Dataset < ApplicationRecord
  has_many :policies
  has_many :rules, through: :policies
  has_many :policy_commentaries, through: :rules
  has_many :constraints, through: :rules
  has_many :prior_linkages
end
