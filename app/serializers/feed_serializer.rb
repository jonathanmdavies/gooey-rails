class FeedSerializer
  include Alba::Resource

  attributes :id, :name, :url, :status, :created_at

  attribute :status do |feed|
    feed.status.humanize
  end

  attribute :created_at do |feed|
    feed.created_at.strftime('%b %d, %Y')
  end
end
