class Read::Feeds::ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    feed = current_account.feeds.find(params[:feed_id])
    items = feed.items.unread.order(published_at: :desc)

    render inertia: 'Unread/Index',
           props: {
             feeds: feeds,
             feed: feed,
             items: items,
           }
  end

  def show
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    feed = current_account.feeds.find(params[:feed_id])
    items = feed.items.unread.order(published_at: :desc)
    item = items.find { |i| i.id == params[:id].to_i }

    render inertia: 'Unread/Index',
           props: {
             feeds: feeds,
             feed: feed,
             items: items,
             item: item,
           }
  end
end
