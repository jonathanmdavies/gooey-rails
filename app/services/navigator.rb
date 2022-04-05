class Navigator
  include Rails.application.routes.url_helpers
  attr_accessor :item, :scope, :target

  def initialize(item:, scope:, target:)
    @item = item
    @scope = scope
    @target = target
    @router = Router.new
    @fallback = FallbackRouter.new
  end

  def navigate
    send(target)
  end

  private

  def first
    first_item = ItemFetcher.send(scope, item.feed.id).first
    first_item ? @router.path(item: first_item, scope: scope) : @fallback.path(item: first, scope: scope)
  end

  def last
    last_item = ItemFetcher.send(scope, item.feed.id).last
    last_item ? @router.path(item: last_item, scope: scope) : @fallback.path(item: first, scope: scope)
  end

  def next
    new_item = ItemFetcher.send(scope, item.feed_id).where('published_at < ?', item.published_at).first
    new_item ? @router.path(item: new_item, scope: scope) : first
  end

  def previous
    previous_item = ItemFetcher.send(scope, item.feed_id).where('published_at > ?', item.published_at).first
    previous_item ? @router.path(item: previous_item, scope: scope) : @fallback.path(item: first, scope: scope)
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

  class FallbackRouter
    include Rails.application.routes.url_helpers

    def path(item:, scope:)
      case scope
      when :all
        items_path
      when :feed
        feed_items_path(item.feed_id)
      when :all_unread
        unread_items_path
      when :unread_feed
        unread_items_path
      end
    end
  end
end
