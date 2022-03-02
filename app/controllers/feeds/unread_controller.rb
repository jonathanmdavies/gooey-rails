class Feeds::UnreadController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.order(created_at: 'desc').select(:id, :name)
    feed = current_account.feeds.find(params[:feed_id])
    items = feed.items.where(read_at: nil).limit(20)

    render inertia: 'Feeds/Unread/Index', props: { items: items, feeds: feeds, feed: feed }
  end

  def show
    feeds = current_account.feeds.order(created_at: 'desc').select(:id, :name)
    feed = current_account.feeds.find(params[:feed_id])
    item = current_account.items.find(params[:id])

    render inertia: 'Feeds/Unread/Show', props: { item: item, feeds: feeds, feed: feed }
  end
end
