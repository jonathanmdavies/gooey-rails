class Unread::ItemResource < ItemResource
  attribute :item_path do |item|
    unread_item_path(item)
  end
end
