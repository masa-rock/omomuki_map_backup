class Api::V1::PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts, methods: [:image_url]
  end

  def show
    post = Post.find(params[:id])
    render json: post, methods: [:image_url]
  end

  def create
    post = Post.new(post_params)
    if not params[:images][:name] == ""
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new(decode(params[:images][:data]) + "\n"),
        filename: params[:images][:name]
      )
      post.images.attach(blob)
      post.save
      render json: post, methods: [:image_url]
    else
      post.save
      render json: post, methods: [:image_url]
    end
  end

  def destroy
    tag_posts = TagPost.where(post_id: @post.id)
    tag_posts.each do |tp|
      tp.destroy
    end
    @post.destroy
  end

  private
  def post_params
    params.permit(:name, :address, :business_hours_start, :business_hours_end, :fee, :eat_walk, :stay_time, :description, tag_ids: [])
  end

  def decode(str)
    Base64.decode64(str.split(',').last)
  end
end
