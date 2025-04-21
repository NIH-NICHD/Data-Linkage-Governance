class CreateFunctions < ActiveRecord::Migration[7.1]
  def change
    create_table :functions do |t|
      t.string :type
      t.references :rule
      t.references :party
      t.timestamps
    end
  end
end
