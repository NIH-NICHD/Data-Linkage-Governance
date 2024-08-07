class CreateRules < ActiveRecord::Migration[7.1]
  def change
    create_table :rules do |t|
      t.string :type
      t.string :action
      # Note: A rule can either reference a policy or (if it's a duty) another rule
      t.references :policy
      t.references :rule
      t.timestamps
    end
  end
end
