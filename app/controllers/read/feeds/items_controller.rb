class Read::Feeds::ItemsController < ApplicationController
  before_action :authenticate_account!

  def show
    feeds = current_account.feeds.order_by_created_at_and_item_published_at
    feed = feeds.find { |i| i.id == params[:feed_id].to_i }
    items = feed.items
    item = items.find { |i| i.id == params[:id].to_i }

    render inertia: 'Unread/Index',
           props: {
             feeds: Read::FeedResource.new(feeds).serializable_hash,
             feed: feed,
             items: ItemResource.new(items, params: { context: :feed }).serializable_hash,
             item: item,
           }
  end
end
