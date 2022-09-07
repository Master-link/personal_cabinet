# frozen_string_literal: true

Rails.application.routes.draw do
  resources :resolutions do
    collection do
      put :update_resolutions_for_role
    end
  end
  mount ActionCable.server => "/lkcable"

  mount LetterOpenerWeb::Engine, at: "/letter_opener"

  post "auth/login", to: "authentication#authenticate"
  post "signup", to: "users#create"
  get "users/:id", to: "users#show"
  get "auth/login_as_user/:id", to: "authentication#login_as_user", as: :login_as_user
  get "users", to: "users#index"
  get "users/:id/crm", to: "users#crm"
  put "users/:id", to: "users#update"
  post "users/refresh_token", to: "authentication#refresh_token"
  delete "users/:id", to: "users#destroy"
  post "users/create_user", to: "users#admin_create"
  put "password/set_new_password", to: "passwords#set_new_password"
  post "password/forgot", to: "passwords#forgot"
  post "password/reset", to: "passwords#reset"
  post "users/:id/reset_password", to: "passwords#reset_password"
  put "password/change_password", to: "passwords#change_password"
  get "/api/v1/users/:id", to: "users#userinfo"

  scope module: :v1, constraints: ApiVersion.new("v1", true), defaults: {format: "json"} do
    root to: "pages#index"

    get "/api/v1/monitoring/checks", to: "pages#monitoring_check"

    resources :alert_settings, only: %i[index update]
    resources :claims, only: %i[index show create update] do
      collection do
        get :count_new
      end
      member do
        get :approve
        get :refuse
      end
    end
    resources :clients, except: %i[create destroy] do
      resources :documents, only: [] do
        collection do
          get "client_index"
        end
        member do
          post "send_email"
          get :pdf
          get :html
        end
      end
      collection do
        get :search
        get "crm_id/:crm_id", action: "find_by_crm_id"
      end
      member do
        get "services", action: "services"
        get :search_available_services
        get "search/:service_id/available_tariffs", to: "clients#search_available_tariffs"
        get :get_roles_q_and_a
        put :roles_q_and_a
      end
    end
    resources :countries
    resources :currencies do
      collection do
        get :search
      end
    end
    resources :documents, only: %i[index create]
    resources :employees do
      collection do
        get :managers
      end
    end
    resources :legal_entities do
      collection do
        get :search
      end
    end
    resources :nomenclatures do
      collection do
        get :search_autocomplete
      end
    end
    resources :operators
    resources :service_balances do
      collection do
        get :show_by_params
        put :sum_balance
        put "/:client_id/service/:service_id/money_to_hours", action: "money_to_hours"
      end
    end
    resources :services do
      collection do
        get :list_services
        get :list
        get :search_autocomplete
        get :search_autocomplete_active_subscriptions
        get "for/:crm_id", action: "for_crm"
      end
    end
    resources :sms_logins do
      collection do
        get :search
        get :search_free
      end
    end
    resources :smpp_accounts, only: [:index]
    get "/api/v1/subscriptions", to: "subscriptions#mnp"
    resources :subscriptions do
      member do
        put :activate
        put :admin_add_hours
        put :close
        put :suspend
      end
      collection do
        get "closed_and_renewed", action: "closed_and_renewed"
        get "closed_and_renewed_details/:id", action: "closed_and_renewed_details"
        get "clients/:client_id/services/:service_id/tmsupport", action: "tmsupport"
        get "fetch_active_tmsupport/:client_id", action: "fetch_active_tmsupport"
        get "has_urgent_stp/:crm", action: "has_urgent_stp"
        post "active_urgent_subscribe", action: "active_urgent_subscribe"
        get "client/:client_id/active/:service_id", action: "active_service_subscribes"
        get :search
        put "client/:client_id/service/:service_id", action: "tmsupport_edit"
        get "client/:client_id/pay_systems", action: "client_subscribes_paysystems_names"
        put ":id/client/:client_id/auto_continue", action: "auto_continue"
      end
    end
    resources :tariffs do
      member do
        get :count_active_subscriptions
      end
      collection do
        get :search_autocomplete
        post :create_subscription_duplicates
      end
    end
    resources :transactions do
      collection do
        get :summ
      end
      member do
        get :by_clients
      end
    end
    namespace :ntf do
      resources :messages, only: [:index] do
        patch :read
        collection do
          patch :read_all
        end
      end
      resources :categories, only: [:index]
    end
  end
end
