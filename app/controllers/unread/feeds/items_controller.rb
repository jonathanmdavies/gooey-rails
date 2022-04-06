class Unread::Feeds::ItemsController < ApplicationController
  before_action :authenticate_account!

  def show
    feeds = current_account.feeds.includes(:unread_items)
    feed = feeds.find { |i| i.id == params[:feed_id].to_i }
    items = feed.unread_items
    item = items.find { |i| i.id == params[:id].to_i }

    render inertia: 'Unread/Index',
           props: {
             feeds: Unread::FeedResource.new(feeds).serializable_hash,
             feed: feed,
             items: Unread::Feed::ItemResource.new(items).serializable_hash,
             item: item,
           }
  end
end
