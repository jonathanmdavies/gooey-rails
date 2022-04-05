class Unread::ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.includes(:unread_items)
    items = current_account.unread_items

    render inertia: 'Unread/Index', props: {
      items: Unread::ItemResource.new(items).serializable_hash,
      feeds: Read::FeedResource.new(feeds).serializable_hash,
    }
  end

  def show
    feeds = current_account.feeds.includes(:unread_items)
    items = current_account.unread_items
    item = items.find { |i| i.id == params[:id].to_i }
    feed = feeds.find { |i| i.id == item.feed_id }

    render inertia: 'Unread/Index', props: {
      items: Unread::ItemResource.new(items).serializable_hash,
      feeds: Read::FeedResource.new(feeds).serializable_hash,
      feed: feed,
      item: item,
    }
  end
end
