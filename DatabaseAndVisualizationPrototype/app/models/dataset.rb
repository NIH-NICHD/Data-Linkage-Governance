class Dataset < ApplicationRecord
  has_many :policies
  has_many :rules, through: :policies
  has_many :policy_commentaries, through: :rules
  has_many :constraints, through: :rules
  has_many :prior_linkages

  # Cache key for caching results for all datasets, used in JSON API
  def self.cache_key
    { object: 'datasets', updated_at: Dataset.maximum(:updated_at) }
  end
end
