class FunctionSerializer < ActiveModel::Serializer
  attributes :type
  has_one :party
end
