class FeedDecorator
  attr_reader :feed
  def initialize(feed)
    @feed = feed
  end

  def first_item
    feed.items.first&.id
  end
end
