class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Helpers
  # protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token, raise: false
  helper_method :current_user, :user_signed_in?
end
