class Feeds::ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    feed = current_account.feeds.find(params[:feed_id])
    pagy, items = pagy(feed.items.unread.order(published_at: :desc))

    render inertia: 'Unread/Index',
           props: {
             items: items,
             feeds: feeds,
             feed: feed,
             pagy: pagy_metadata(pagy),
           }
  end
end
