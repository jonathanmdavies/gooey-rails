Rails.application.routes.draw do
  require 'sidekiq/web'

  devise_for :accounts, controllers: {
    sessions: 'accounts/sessions',
  }

  devise_scope :account do
    authenticated :account do
      root to: 'all/items#index', as: :authenticated_account_root

      scope module: 'manage', path: 'manage' do
        resources :feeds, only: [:create, :index, :destroy] do
          patch :refresh, on: :member
          patch :refresh_all, on: :collection
        end
      end

      namespace 'unread' do
        resources :feeds, only: [] do
          resources :items, only: [:show], module: :feeds
        end
        resources :items, only: [:index, :show]
      end

      scope module: 'all' do
        resources :feeds, only: [] do
          resources :items, only: [:show, :index], module: :feeds
        end
        resources :items, only: [:index, :show] do
          resource :read, only: [:create, :destroy]
        end
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
