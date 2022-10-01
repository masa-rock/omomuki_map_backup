class Api::V1::ReviewsController < ApplicationController
  def create
    review = Review.new(review_params)
    if not params[:images][:name] == ""
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new(decode(params[:images][:data]) + "\n"),
        filename: params[:images][:name]
      )
      review.images.attach(blob)
    #   render json: review, methods: [:image_url]
    # else      
    #   render json: review, methods: [:image_url]
    end

    if review.valid?
      review.save
    else
      render json: review, methods: [:error_message]
    end
  end

  private
  def review_params
    params.permit(:title, :comment, :rate, :user_id, :post_id)
  end

  def decode(str)
    Base64.decode64(str.split(',').last)
  end
end
