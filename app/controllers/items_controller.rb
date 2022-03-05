class ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.order(created_at: :desc).select(:id, :name)
    pagy, items = pagy(current_account.items.unread.order(published_at: :desc))

    render inertia: 'Unread/Index', props: { items: items, feeds: feeds, pagy: pagy_metadata(pagy) }
  end
end
