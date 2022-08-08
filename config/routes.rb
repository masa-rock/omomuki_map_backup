Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  root to: redirect('/todos')
  get 'tags', to: 'site#index'
  get 'tags/new', to: 'site#index'
  get 'tags/:id/edit', to: 'site#index'

  namespace :api do
    namespace :v1 do
      # delete '/todos/destroy_all', to: 'todos#destroy_all'
      resources :tags, only: %i[index show create update]
    end
  end
end
