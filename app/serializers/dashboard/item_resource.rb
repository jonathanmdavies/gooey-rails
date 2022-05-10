class Dashboard::ItemResource
  include Alba::Resource
  include Rails.application.routes.url_helpers
  include ActionView::Helpers::DateHelper

  attributes :id, :title, :published_at, :bookmarked_at, :read_at

  attribute :published_at_in_words do |item|
    time_ago_in_words(item.published_at)
  end

  one :feed, resource: FeedResource
end
