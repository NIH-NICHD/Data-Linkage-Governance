class CreatePriorLinkages < ActiveRecord::Migration[7.1]
  def change
    create_table :prior_linkages do |t|
      t.string :dataset_name
      t.string :dataset_type
      t.string :dataset_source
      t.string :methodology
      t.jsonb :pii_elements, default: []
      t.string :entity_resolver
      t.string :performing_party
      t.text :quality_assessment
      t.text :data_sharing_method
      t.references :dataset
      t.timestamps
    end
  end
end
