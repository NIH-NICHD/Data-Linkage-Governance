class PriorLinkageSerializer < ActiveModel::Serializer
  attributes :dataset_name, :dataset_type, :dataset_source, :methodology, :pii_elements, :entity_resolver, :performing_party,
             :quality_assessment, :data_sharing_method
end
