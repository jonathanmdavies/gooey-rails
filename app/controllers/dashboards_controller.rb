class DashboardsController < ApplicationController
  before_action :authenticate_account!

  def show
    items = current_account.unread_items.includes(:feed).limit(6)
    items_published_today = current_account.items.
      where(published_at: Date.today.beginning_of_day..Date.today.end_of_day).
      count
    unread_items_count = current_account.unread_items_count
    bookmarks_count = current_account.bookmarks_count
    unread_bookmarks_count = current_account.unread_bookmarks_count

    render inertia: 'Dashboard/Show', props: {
      items_published_today: items_published_today,
      unread_items_count: unread_items_count,
      bookmarks_count: bookmarks_count,
      unread_bookmarks_count: unread_bookmarks_count,
      items: Dashboard::ItemResource.new(items).serializable_hash,
    }
  end
end
