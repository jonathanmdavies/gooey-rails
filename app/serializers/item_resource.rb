class ItemResource
  include Alba::Resource

  root_key :account

  attributes :id, :title, :content, :permalink, :entry_id, :published_at, :read_at, :feed_id

  one :feed, resource: FeedResource
end
