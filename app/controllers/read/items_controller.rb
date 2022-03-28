class Read::ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    items = current_account.items.order(published_at: :desc)

    render inertia: 'Unread/Index', props: {
      items: ItemResource.new(items).serializable_hash,
      feeds: feeds,
    }
  end

  def show
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    items = current_account.items.order(published_at: :desc)
    item = items.find { |i| i.id == params[:id].to_i }
    feed = item.feed

    render inertia: 'Unread/Index', props: {
      items: ItemResource.new(items).serializable_hash,
      feeds: feeds,
      feed: feed,
      item: item,
    }
  end
end
