class Unread::Feeds::ItemsController < ApplicationController
  before_action :authenticate_account!

  def show
    item = current_account.unread_items.find(params[:id])
    feeds = current_account.feeds.includes(:unread_items)
    feed = feeds.find { |i| i.id == params[:feed_id].to_i }
    pagy, records = pagy(feed.unread_items, page: item_page(item), items: 30)

    render inertia: 'Unread/Index',
           props: {
             groups: current_account.groups,
             feed: feed,
             feeds: Unread::FeedResource.new(feeds).serializable_hash,
             items: Unread::Feed::ItemResource.new(records).serializable_hash,
             item: item,
             pagy: pagy_metadata(pagy),
           }
  end

  private

  def item_page(item)
    params[:page].present? ? params[:page].to_i : ItemPage.new(current_account, item, target: :unread_feed).page
  end
end
