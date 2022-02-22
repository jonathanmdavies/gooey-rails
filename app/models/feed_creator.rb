class FeedCreator
  def initialize
    @http = HTTParty
    @parser = Feedjira
  end

  def create_feed(current_account, feed_params)
    feed = current_account.feeds.build(feed_params)
    url, name = get_feed_content(feed_params[:url])
    feed.url = url
    feed.name = name
    feed.last_fetched_at = 1.day.ago

    feed.save
    Result.new(created: feed.valid?, feed: feed)
  rescue Feedjira::NoParserAvailable, Errno::ECONNREFUSED => e
    feed.errors.add(:url, message: e.message)
    Result.new(created: false, feed: feed)
  end

  private

  def get_feed_content(feed_url)
    xml = @http.get(feed_url).body
    feed = @parser.parse(xml)
    [feed.feed_url, feed.title]
  end

  class Result
    attr_reader :feed

    def initialize(created:, feed: nil)
      @created = created
      @feed = feed
    end

    def created?
      @created
    end
  end
end
