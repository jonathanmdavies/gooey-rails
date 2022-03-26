class FeedFetcher
  def initialize(feed:)
    @http = HTTParty
    @parser = Feedjira
    @feed = feed
    @current_account = feed.account
  end

  def fetch_items
    items = []
    get_entries.each do |entry|
      break if entry_published_before_last_fetch?(entry)
      next if item_already_present?(entry)

      result = ItemCreator.new(entry: entry, feed: @feed).create_item
      items << result.item if result.created?
    end

    @feed.update(last_fetched_at: Time.now, status: :active)
    Result.new(successful: true, fetched_items_count: items.size)
  rescue Errno::ECONNREFUSED, Feedjira::NoParserAvailable, Addressable::URI::InvalidURIError, SocketError
    @feed.update(status: :inactive)
    Result.new(successful: false, feed: @feed)
  end

  private

  def get_entries
    xml = @http.get(@feed.url).body
    @parser.parse(xml).entries
  end

  def entry_published_before_last_fetch?(entry)
    entry.published.to_time < @feed.last_fetched_at
  end

  def item_already_present?(entry)
    @current_account.items.find_by(entry_id: entry.entry_id).present?
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
