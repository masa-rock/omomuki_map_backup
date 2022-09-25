class Api::V1::WantToGoesController < ApplicationController  
  def create
    set_post()
    @want_to_go = WantToGo.create(user_id: @user.id, post_id: @post.id)
  end

  def destroy
    @want_to_go = WantToGo.find(params[:id])
    @want_to_go.destroy
  end
  
  private
  def set_post
    @post = Post.find(params[:post_id])
    @user = User.find(params[:user_id])
  end
end
