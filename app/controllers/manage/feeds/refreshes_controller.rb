class Manage::Feeds::RefreshesController < ApplicationController
  before_action :authenticate_account!

  def create
    feed = current_account.feeds.find(params[:feed_id])
    result = FeedFetcher.new(feed: feed).fetch_items

    if result.successful?
      flash[:notice] = "#{result.fetched_items_count} new item added to #{feed.name}."
      redirect_back fallback_location: feeds_path
    else
      flash[:alert] = 'There was a problem refreshing this feed – it has been set to inactive.'
      redirect_back fallback_location: feeds_path
    end
  end
end
