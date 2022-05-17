class ItemPage
  def initialize(current_account, item, target:)
    @current_account = current_account
    @item = item
    @target = target
    @per_page = 30
  end

  def page
    (position / @per_page) == 0 ? 1 : (position / @per_page).ceil + 1
  end

  private

  def position
    target_items.where("published_at >= ?", @item.send(:published_at)).count
  end

  def target_items
    send(@target, @item.feed_id)
  end

  def all(_)
    @current_account.items
  end

  def feed(feed_id)
    @current_account.items.where(feed_id: feed_id)
  end

  def all_unread(_)
    @current_account.unread_items
  end

  def unread_feed(feed_id)
    @current_account.unread_items.where(feed_id: feed_id)
  end
end
