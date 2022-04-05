class All::ReadsController < ApplicationController
  before_action :authenticate_account!

  def create
    @item = current_account.items.find(params[:item_id])
    @item.update(read_at: Time.now)

    redirect_back fallback_location: feed_item_path(@item.feed, @item)
  end

  def destroy
    @item = current_account.items.find(params[:item_id])
    @item.update(read_at: nil)

    redirect_back fallback_location: feed_item_path(@item.feed, @item)
  end
end
