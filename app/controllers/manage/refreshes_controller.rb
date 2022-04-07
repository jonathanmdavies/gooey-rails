class Manage::RefreshesController < ApplicationController
  before_action :authenticate_account!

  def create
    current_account.feeds.active.each do |feed|
      RefreshFeedJob.perform_async(feed.id)
    end

    redirect_back fallback_location: feeds_path
  end
end
