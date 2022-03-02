class Items::UnreadController < ApplicationController
  before_action :authenticate_account!

  def index
    feeds = current_account.feeds.order(created_at: 'desc').select(:id, :name)
    items = current_account.items.where(read_at: nil).limit(20)

    render inertia: 'Items/Unread/Index', props: { items: items, feeds: feeds }
  end
end
