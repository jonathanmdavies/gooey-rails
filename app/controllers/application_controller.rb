class ApplicationController < ActionController::Base
  include InertiaCsrf
  include Pagy::Backend

  inertia_share flash: -> {
    {
      success: flash.notice,
      alert: flash.alert,
    }
  }

  inertia_share current_account: -> {
    if current_account
      {
        email: current_account.email,
      }
    end
  }
end
