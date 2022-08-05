class Api::V1::TagController < ApplicationController
  def index
    tags = Tag.all

    render json: {
      tags: tags
    },status: :ok
  end
end
