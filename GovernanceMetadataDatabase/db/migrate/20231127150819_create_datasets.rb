class CreateDatasets < ActiveRecord::Migration[7.1]
  def change
    create_table :datasets do |t|
      # Some of these data elements can be relational if that has value in the future
      t.string :name
      t.string :source
      t.string :source_agency
      t.string :dataset_type
      t.jsonb :information_sources, default: []
      t.jsonb :pii_elements, default: []
      t.string :pii_elements_holder
      t.string :common_data_model
      t.timestamps
    end
  end
end
