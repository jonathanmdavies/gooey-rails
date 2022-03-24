class FeedResource
  include Alba::Resource

  root_key :feed

  attributes :id, :name
end
