class ApplicationController < ActionController::Base
  include InertiaCsrf


  inertia_share flash: -> {
    {
      success: flash.notice,
      alert: flash.alert,
    }
  }

end
