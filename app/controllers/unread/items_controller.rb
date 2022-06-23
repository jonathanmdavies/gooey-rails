class Unread::ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.includes(:unread_items)
    pagy, records = pagy(current_account.unread_items, items: 30)

    render inertia: 'Unread/Index', props: {
      groups: current_account.groups,
      items: Unread::ItemResource.new(records).serializable_hash,
      feeds: Unread::FeedResource.new(feeds).serializable_hash,
      pagy: pagy_metadata(pagy),
    }
  end

  def show
    item = current_account.unread_items.find(params[:id])
    feeds = current_account.feeds.includes(:unread_items)
    pagy, records = pagy(current_account.unread_items, page: item_page(item), items: 30)
    feed = feeds.find { |i| i.id == item.feed_id }

    render inertia: 'Unread/Index', props: {
      groups: current_account.groups,
      items: Unread::ItemResource.new(records).serializable_hash,
      feeds: Unread::FeedResource.new(feeds).serializable_hash,
      feed: feed,
      item: item,
      pagy: pagy_metadata(pagy),
    }
  end

  private

  def item_page(item)
    params[:page].present? ? params[:page].to_i : ItemPage.new(current_account, item, target: :all_unread).page
  end
end
