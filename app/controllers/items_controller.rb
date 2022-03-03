class ItemsController < ApplicationController
  before_action :authenticate_account!

  def index
    pagy, items = pagy(current_account.items.unread.order(published_at: :desc))

    render inertia: 'Unread/Index', props: { items: items, pagy: pagy_metadata(pagy) }
  end
end
