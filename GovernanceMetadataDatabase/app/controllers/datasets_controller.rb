class DatasetsController < ApplicationController

  def index
    @datasets = Dataset.order(:id)
    respond_to do |format|
      format.html
      format.json { render json: @datasets, include: '**' }
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
    @datasets = Dataset.all
    respond_to do |format|
      format.html
      format.json { render json: @datasets, include: '**' }
    end
  end

  def query
    @datasets = Dataset.order(:id)
    @selected_datasets = Dataset.find(params[:datasets] || [])
    @lifecycles = DataLifecycle.all
    @selected_lifecycles = DataLifecycle.find(params[:lifecycles] || [])
  end

end
