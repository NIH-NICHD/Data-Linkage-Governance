class DatasetsController < ApplicationController

  def index
    @datasets = Dataset.order(:id)
    respond_to do |format|
      format.html
      format.json { render json: cached_datasets_json }
    end
  end

  def show
    @dataset = Dataset.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @dataset, include: '**' }
    end
  end

  def all
    @datasets = Dataset.order(:id)
    respond_to do |format|
      format.html
      format.json { render json: cached_datasets_json }
    end
  end

  def query
    @datasets = Dataset.order(:id)
    @selected_datasets = Dataset.find(params[:datasets] || [])
    @lifecycles = DataLifecycle.all
    @selected_lifecycles = DataLifecycle.find(params[:lifecycles] || [])
  end

  private

  # Retrieve the JSON for all the datasets from the cache if available
  def cached_datasets_json
    Rails.cache.fetch(Dataset.cache_key) do
      ActiveModel::SerializableResource.new(Dataset.order(:id), include: '**').to_json
    end
  end
end
