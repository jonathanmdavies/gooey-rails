class Unread::Feed::ItemResource < ItemResource
  attribute :item_path do |item|
    unread_feed_item_path(item.feed_id, item)
  end
end
