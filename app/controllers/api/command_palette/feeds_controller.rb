class Api::CommandPalette::FeedsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.includes(:unread_items).where.not(unread_items_count: 0)
    render json: Unread::FeedResource.new(feeds).serialize
  end
end
