class CreateConstraints < ActiveRecord::Migration[7.1]
  def change
    create_table :constraints do |t|
      t.string :operator
      t.string :left_operand
      t.string :right_operand
      t.references :rule
      t.timestamps
    end
  end
end
