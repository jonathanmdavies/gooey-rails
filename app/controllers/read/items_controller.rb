class Read::ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    items = current_account.items.unread.order(published_at: :desc)

    render inertia: 'Unread/Index', props: { items: items, feeds: feeds }
  end

  def show
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    items = current_account.items.unread.order(published_at: :desc)
    item = items.find { |i| i.id == params[:id].to_i }

    render inertia: 'Unread/Index', props: { items: items, feeds: feeds, item: item }
  end
end