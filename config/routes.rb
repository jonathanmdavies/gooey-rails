Rails.application.routes.draw do
  devise_for :accounts, controllers: {
    sessions: 'accounts/sessions'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'hello_world#index'
end
