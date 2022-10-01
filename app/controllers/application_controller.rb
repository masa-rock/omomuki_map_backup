class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Cookies
  include ActionController::Helpers
  skip_before_action :verify_authenticity_token, raise: false
  helper_method :current_user, :user_signed_in?
end
