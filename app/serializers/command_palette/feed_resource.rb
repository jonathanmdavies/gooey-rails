class CommandPalette::FeedResource
  include Alba::Resource
  include Rails.application.routes.url_helpers

  attributes :id, :name, :created_at, :unread_items_count

  attribute :first_item_url do |feed|
    feed.items.first ? feed_item_path(feed, feed.items.first) : nil
  end
end
