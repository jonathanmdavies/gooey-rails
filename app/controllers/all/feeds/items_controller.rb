class All::Feeds::ItemsController < ApplicationController
  before_action :authenticate_account!

  def show
    item = current_account.items.find(params[:id])
    feeds = current_account.feeds.includes(:items)
    feed = feeds.find { |i| i.id == params[:feed_id].to_i }
    pagy, records = pagy(feed.items, page: item_page(item), items: 30)

    render inertia: 'Unread/Index',
           props: {
             groups: current_account.groups,
             feeds: Read::FeedResource.new(feeds).serializable_hash,
             items: ItemResource.new(records, params: { context: :feed }).serializable_hash,
             feed: feed,
             item: item,
             pagy: pagy_metadata(pagy),
           }
  end

  private

  def item_page(item)
    params[:page].present? ? params[:page].to_i : ItemPage.new(current_account, item, target: :feed).page
  end
end
