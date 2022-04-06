class Manage::RefreshesController < ApplicationController
  before_action :authenticate_account!

  def create
    current_account.feeds.active.each do |feed|
      RefreshFeedJob.perform_async(feed.id)
    end

    flash[:notice] = 'Checking for new items...'
    redirect_back fallback_location: feeds_path
  end
end
