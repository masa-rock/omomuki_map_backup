class Api::V1::Auth::SessionsController < DeviseTokenAuth::ApplicationController
  def index
    binding.pry
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end

  def destroy
    binding.pry
    # remove auth instance variables so that after_action does not run
    user = remove_instance_variable(:@resource) if @resource
    client = @token.client
    @token.clear!

    if user && client && user.tokens[client]
      user.tokens.delete(client)
      user.save!

      if DeviseTokenAuth.cookie_enabled
        # If a cookie is set with a domain specified then it must be deleted with that domain specified
        # See https://api.rubyonrails.org/classes/ActionDispatch/Cookies.html
        cookies.delete(DeviseTokenAuth.cookie_name, domain: DeviseTokenAuth.cookie_attributes[:domain])
      end

      yield user if block_given?

      render_destroy_success
    else
      render_destroy_error
    end
  end
end
