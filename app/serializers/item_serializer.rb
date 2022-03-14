class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :permalink, :entry_id, :published_at,
             :read_at, :feed_id, :next, :previous

  # def next
  #   object.next
  # end

  # def previous
  #   object.previous
  # end
end
