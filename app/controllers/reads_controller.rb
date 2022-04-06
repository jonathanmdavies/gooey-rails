class ReadsController < ApplicationController
  before_action :authenticate_account!

  def create
    @item = current_account.items.find(params[:item_id])
    @item.update(read_at: Time.now)

    result = Navigator.new(item: @item, scope: referrer_scope, target: :next).navigate
    redirect_to result
  end

  def destroy
    @item = current_account.items.find(params[:item_id])
    @item.update(read_at: nil)

    result = Navigator.new(item: @item, scope: referrer_scope, target: :next).navigate
    redirect_to result
  end

  private

  def referrer_scope
    if request.referrer.include?('/unread') && request.referrer.include?('/feed')
      :unread_feed
    elsif request.referrer.include?('/unread')
      :all_unread
    elsif request.referrer.include?('/feed')
      :feed
    else
      :all
    end
  end
end
