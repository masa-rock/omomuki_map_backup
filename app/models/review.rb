class Review < ApplicationRecord

  has_many_attached :images
  belongs_to :user
  belongs_to :post

  def image_url
    images.attached? ? url_for(images[0]) : []
  end
end
