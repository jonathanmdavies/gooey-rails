class FeedCreator
  def initialize
    @http = HTTParty
    @parser = Feedjira
  end

  def create_feed(current_account, url:, initially_fetch: :one_week_ago)
    feed = current_account.feeds.build
    parsed_feed = retrieve_feed(url)
    feed.assign_attributes(
      name: parsed_feed.title,
      url: url,
      last_fetched_at: set_last_fetched_at(initially_fetch)
    )
    feed.save

    Result.new(created: feed.valid?, feed: feed)
  rescue Errno::ECONNREFUSED, Feedjira::NoParserAvailable, Addressable::URI::InvalidURIError
    feed.errors.add(:url, message: "We couldn't find a feed at that URL.")
    Result.new(created: false, feed: feed)
  end

  private

  def retrieve_feed(url)
    xml = @http.get(url).body
    @parser.parse(xml)
  end

  def set_last_fetched_at(initial_fetch)
    TimeStringParser.parse(initial_fetch)
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
