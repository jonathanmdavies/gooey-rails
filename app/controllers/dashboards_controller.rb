class DashboardsController < ApplicationController
  before_action :authenticate_account!

  def show
    items = current_account.unread_items.includes(:feed).limit(6)
    items_published_today = current_account.items.
      where(published_at: Date.today.beginning_of_day..Date.today.end_of_day).
      count

    render inertia: 'Dashboard/Show', props: {
      items_published_today: items_published_today,
      items: Dashboard::ItemResource.new(items).serializable_hash,
    }
  end
end
