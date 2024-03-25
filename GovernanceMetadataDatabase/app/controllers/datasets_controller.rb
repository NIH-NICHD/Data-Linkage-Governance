class DatasetsController < ApplicationController

  def index
    @datasets = Dataset.order(:id)
  end

  def show
    @dataset = Dataset.find(params[:id])
  end

  def all
    @datasets = Dataset.all
  end

  def query
    @datasets = Dataset.order(:id)
    @selected_datasets = Dataset.find(params[:datasets] || [])
    @lifecycles = DataLifecycle.all
    @selected_lifecycles = DataLifecycle.find(params[:lifecycles] || [])
  end

end
