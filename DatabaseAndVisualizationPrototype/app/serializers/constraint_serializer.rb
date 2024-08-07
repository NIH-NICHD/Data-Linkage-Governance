class ConstraintSerializer < ActiveModel::Serializer
  attributes :left_operand, :operator, :right_operand
end
