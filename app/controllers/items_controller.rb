class ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    items = current_account.items.unread.order(published_at: :desc)

    render inertia: 'Unread/Index', props: { items: items, feeds: feeds }
  end

  def show
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    items = current_account.items.unread.order(published_at: :desc)
    item = ItemSerializer.new(current_account.items.find(params[:id]))

    render inertia: 'Unread/Index',
           props: {
             feeds: feeds,
             items: items,
             item: item,
           }
  end
end
