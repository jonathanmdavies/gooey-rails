class RefreshFeedJob
  include Sidekiq::Job

  def perform(feed_id)
    feed = Feed.find(feed_id)
    FeedFetcher.new(feed: feed).fetch_items
  end
end
