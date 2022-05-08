class BookmarksController < ApplicationController
  before_action :authenticate_account!

  def create
    item = current_account.items.find(params[:item_id])

    item.update(bookmarked_at: Time.now)
    redirect_back fallback_location: root_path
  end

  def destroy
    item = current_account.items.find(params[:item_id])

    item.update(bookmarked_at: nil)
    redirect_back fallback_location: root_path
  end
end
