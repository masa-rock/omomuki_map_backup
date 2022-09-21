class Review < ApplicationRecord

  include Rails.application.routes.url_helpers
  
  has_many_attached :images
  belongs_to :user
  belongs_to :post

  def image_url
    images.attached? ? url_for(images[0]) : []
  end
end
