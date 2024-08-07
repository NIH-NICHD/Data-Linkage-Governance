class RuleSerializer < ActiveModel::Serializer
  attributes :type, :action
  has_many :constraints
  has_many :functions
  has_many :policy_commentaries
  has_many :duties, class_name: 'Rule'
end
