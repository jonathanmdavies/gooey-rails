class Feeds::ItemsController < ApplicationController
  before_action :authenticate_account!

  def show
    feeds = current_account.feeds.order_by_created_at_and_item_published_at
    feed = feeds.find { |f| f.id == params[:feed_id].to_i }
    item = feed.items.find { |f| f.id == params[:id].to_i }

    render inertia: 'Unread/Index',
           props: {
             feeds: feeds.map { |f| FeedSerializer.new(f) },
             feed: feed,
             items: feed.items,
             item: ItemSerializer.new(item),
           }
  end
end
