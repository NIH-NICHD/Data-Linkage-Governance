class CreatePolicies < ActiveRecord::Migration[7.1]
  def change
    create_table :policies do |t|
      t.string :type
      t.string :name
      t.references :dataset
      t.timestamps
    end
  end
end
