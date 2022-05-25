Rails.application.routes.draw do
  require 'sidekiq/web'

  devise_for :accounts, controllers: {
    sessions: 'accounts/sessions',
    registrations: 'accounts/registrations',
  }

  devise_scope :account do
    authenticated :account do
      root to: 'unread/items#index', as: :authenticated_account_root

      scope module: 'manage', path: 'manage' do
        resource :import, only: [:create]
        resources :feeds, only: [:create, :index, :destroy] do
          resource :refresh, only: [:create], module: 'feeds'
        end
        resource :refresh, only: [:create]
      end

      scope module: 'all' do
        resources :feeds, only: [] do
          resources :items, only: [:index, :show], module: :feeds
        end
        resources :items, only: [:index, :show]
      end

      namespace 'unread' do
        resources :items, only: [:index, :show]
        resources :feeds, only: [] do
          resources :items, only: [:show], module: :feeds
        end
      end

      resource :dashboard, only: [:show]

      resources :items, only: [] do
        resource :read, only: [:create, :destroy]
        resource :bookmark, only: [:create, :destroy]
      end
    end
  end

  unauthenticated do
    root 'accounts/sessions#new', as: :root
  end

  if Rails.env.development?
    mount Sidekiq::Web => '/sidekiq'
  end
end
