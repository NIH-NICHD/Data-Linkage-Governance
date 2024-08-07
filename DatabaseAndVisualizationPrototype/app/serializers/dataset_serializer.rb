class DatasetSerializer < ActiveModel::Serializer
  attributes :name, :source, :source_agency, :dataset_type, :information_sources, :pii_elements, :pii_elements_holder, :common_data_model, :description
  has_many :policies
  has_many :prior_linkages
end
