class Unread::FeedResource < Read::FeedResource
  attributes :unread_items_count

  attribute :first_item_url do |feed|
    feed.unread_items.first ? unread_feed_item_path(feed, feed.unread_items.first) : nil
  end
end
