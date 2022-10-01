Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'want_to_goes/create'
    end
  end
  # mount_devise_token_auth_for 'User', at: 'auth'
  root to: redirect('/todos')
  get 'tags', to: 'site#index'
  get 'tags/new', to: 'site#index'
  get 'tags/:id/edit', to: 'site#index'

  namespace :api do
    namespace :v1 do
      # delete '/todos/destroy_all', to: 'todos#destroy_all'
      resources :tag, only: %i[index show create update]
      resources :posts, only: %i[index show create update destroy]
      resources :reviews, only: %i[index create]
      resources :want_to_goes, only: %i[create destroy]
      get 'posts/review_data/:id', to: 'posts#post_review'

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
