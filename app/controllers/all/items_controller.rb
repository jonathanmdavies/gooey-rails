class All::ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.includes(:items)
    items = current_account.items.order(published_at: :desc)

    render inertia: 'Unread/Index', props: {
      items: ItemResource.new(items).serializable_hash,
      feeds: Read::FeedResource.new(feeds).serializable_hash,
    }
  end

  def show
    feeds = current_account.feeds.includes(:items)
    items = current_account.items.order(published_at: :desc)
    item = items.find { |i| i.id == params[:id].to_i }
    feed = item.feed

    render inertia: 'Unread/Index', props: {
      items: ItemResource.new(items).serializable_hash,
      feeds: Read::FeedResource.new(feeds).serializable_hash,
      feed: feed,
      item: item,
    }
  end
end
