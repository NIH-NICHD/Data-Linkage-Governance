class PolicyCommentarySerializer < ActiveModel::Serializer
  attributes :language, :interpretation
  has_one :data_lifecycle
  has_many :sources
end
