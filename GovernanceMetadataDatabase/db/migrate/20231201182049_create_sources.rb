class CreateSources < ActiveRecord::Migration[7.1]
  def change
    create_table :sources do |t|
      t.string :name
      t.string :link
      t.date :accessed_on
      t.references :policy_commentary
      t.timestamps
    end
  end
end
