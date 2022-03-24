class DashboardsController < ApplicationController
  before_action :authenticate_account!

  def show
    items = ItemResource.new(current_account.items.includes(:feed).order(published_at: :desc).limit(10))

    render inertia: 'Dashboard/Show', props: {
      items: items,
    }
  end
end
