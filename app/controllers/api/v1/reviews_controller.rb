class Api::V1::ReviewsController < ApplicationController
  def create
    review = Review.new(review_params)
    if not params[:images][:name] == ""
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new(decode(params[:images][:data]) + "\n"),
        filename: params[:images][:name]
      )
      review.images.attach(blob)
      review.save
      render json: review, methods: [:image_url]
    else
      review.save
      render json: review, methods: [:image_url]
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
