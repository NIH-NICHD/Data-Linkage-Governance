class CreateDataLifecycles < ActiveRecord::Migration[7.1]
  def change
    create_table :data_lifecycles do |t|
      t.string :name
      t.timestamps
    end
  end
end
