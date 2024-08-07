class CreateRequirements < ActiveRecord::Migration[7.1]
  def change
    create_table :requirements do |t|
      t.references :requiring_policy
      t.references :required_policy
      t.timestamps
    end
  end
end
