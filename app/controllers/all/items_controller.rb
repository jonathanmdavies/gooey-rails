class All::ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.includes(:items)
    items = current_account.items

    render inertia: 'Unread/Index', props: {
      items: ItemResource.new(items).serializable_hash,
      feeds: Blah::FeedResource.new(feeds).serializable_hash,
    }
  end

  def show
    feeds = current_account.feeds.includes(:items)
    items = current_account.items
    item = items.find { |i| i.id == params[:id].to_i }
    feed = item.feed

    render inertia: 'Unread/Index', props: {
      items: ItemResource.new(items).serializable_hash,
      feeds: Blah::FeedResource.new(feeds).serializable_hash,
      feed: feed,
      item: item,
    }
  end
end
