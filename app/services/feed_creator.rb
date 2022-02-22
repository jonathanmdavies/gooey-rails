class FeedCreator
  def initialize
    @http = HTTParty
    @parser = Feedjira
  end

  def create_feed(current_account, url:)
    feed = current_account.feeds.build
    title, feed_url = retreive_feed(url)

    feed.assign_attributes(name: title, url: feed_url)
    feed.save

    Result.new(created: feed.valid?, feed: feed)
  rescue Errno::ECONNREFUSED, Feedjira::NoParserAvailable
    feed.errors.add(:url, message: "We couldn't find a feed at that URL.")
    Result.new(created: false, feed: feed)
  end

  private

  def retreive_feed(url)
    xml = @http.get(url).body
    feed = @parser.parse(xml)
    [feed.title, feed.feed_url]
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
