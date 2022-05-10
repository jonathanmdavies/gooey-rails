class DashboardsController < ApplicationController
  before_action :authenticate_account!

  def show
    items = current_account.unread_items.includes(:feed).limit(6)
    items_published_today = current_account.items.published_today.count
    unread_items_count = current_account.unread_items_count
    bookmarks_count = current_account.bookmarks_count
    unread_bookmarks_count = current_account.unread_bookmarks_count
    bookmarked_items = current_account.items.bookmarked.includes(:feed).limit(5)
    read_by_week = current_account.items.unscope(:order).group_by_week(:read_at, format: 'Week %U', last: 4).count

    render inertia: 'Dashboard/Show', props: {
      items_published_today: items_published_today,
      unread_items_count: unread_items_count,
      bookmarks_count: bookmarks_count,
      unread_bookmarks_count: unread_bookmarks_count,
      items: Dashboard::ItemResource.new(items).serializable_hash,
      bookmarked_items: Dashboard::ItemResource.new(bookmarked_items).serializable_hash,
      read_by_week: read_by_week,
    }
  end
end
