class AddDescriptionToDatasets < ActiveRecord::Migration[7.1]
  def change
    add_column :datasets, :description, :text
  end
end
