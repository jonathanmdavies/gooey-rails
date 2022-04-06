class Navigator
  include Rails.application.routes.url_helpers
  attr_reader :item, :scope, :target

  def initialize(item:, scope:, target:)
    @item = item
    @scope = scope
    @target = target
    @router = Router.new
  end

  def navigate
    send(target)
  end

  private

  def next
    next_item = ItemFetcher.send(scope, item.feed_id).where('published_at < ?', item.published_at).first
    next_item ? @router.path(item: next_item, scope: scope) : root_path
  end

  class ItemFetcher
    def self.all(_)
      Item.order(published_at: :desc).all
    end

    def self.feed(feed_id)
      Item.order(published_at: :desc).where(feed_id: feed_id)
    end

    def self.all_unread(_)
      Item.order(published_at: :desc).unread
    end

    def self.unread_feed(feed_id)
      Item.order(published_at: :desc).unread.where(feed_id: feed_id)
    end
  end

  class Router
    include Rails.application.routes.url_helpers

    def path(item:, scope:)
      case scope
      when :all
        item_path(item)
      when :feed
        feed_item_path(item.feed_id, item)
      when :all_unread
        unread_item_path(item)
      when :unread_feed
        unread_feed_item_path(item.feed_id, item)
      end
    end
  end
end
