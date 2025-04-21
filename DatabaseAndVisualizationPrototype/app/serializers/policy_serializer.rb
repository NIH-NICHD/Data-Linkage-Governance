class PolicySerializer < ActiveModel::Serializer
  attributes :type, :name
  has_many :rules
  has_many :required_policies do |serializer|
    serializer.object.required_policies.map { |p| p.as_json(only: [:type, :name]) }
  end
end
