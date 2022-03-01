class FeedFetcher
  def initialize(feed:)
    @http = HTTParty
    @parser = Feedjira
    @feed = feed
  end

  def fetch_items
    items = []
    get_entries.each do |entry|
      result = ItemCreator.new(entry: entry, feed: @feed).create_item
      items << result.item if result.created?
    end

    @feed.update(last_fetched_at: Time.now, status: :active)
    Result.new(successful: true, fetched_items_count: items.size)
  rescue Errno::ECONNREFUSED, Feedjira::NoParserAvailable, Addressable::URI::InvalidURIError
    @feed.update(status: :inactive)
    Result.new(successful: false, feed: @feed)
  end

  private

  def get_entries
    xml = @http.get(@feed.url).body
    @parser.parse(xml).entries
  end

  class Result
    attr_reader :feed, :fetched_items_count

    def initialize(successful:, feed: nil, fetched_items_count: 0)
      @successful = successful
      @fetched_items_count = fetched_items_count
      @feed = feed
    end

    def successful?
      @successful
    end
  end
end