class DashboardsController < ApplicationController
  before_action :authenticate_account!

  def show
    items = current_account.unread_items.includes(:feed).limit(6)

    render inertia: 'Dashboard/Show', props: {
      items: Dashboard::ItemResource.new(items).serializable_hash,
    }
  end
end
