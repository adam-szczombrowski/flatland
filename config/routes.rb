Rails.application.routes.draw do
  resources :cards, only: [:index, :new, :create]
  root 'home#index'
  get "/*" => "home#index"
end
