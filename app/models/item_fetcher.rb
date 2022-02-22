class ItemFetcher
  def initialize(feed, http: HTTParty, parser: Feedjira)
    @feed = feed
    @http = http
    @parser = parser
  end

  def update_feed_items
    xml = @http.get(@feed.url).body
    feed_content = @parser.parse(xml)

    items = []
    feed_content.entries.each do |entry|
      # check if the first entry was published after last fetch... break if not
      break if entry.published.to_time < @feed.last_fetched_at
      # do we already have this item – currently won't handle updated items
      next if Item.find_by(entry_id: entry.entry_id)

      item = Item.new(
        title: entry.title,
        body: entry.content,
        published_at: entry.published,
        entry_id: entry.entry_id,
        permalink: entry.url,
        feed_id: @feed.id
      )

      items << item
    end

    Item.transaction do
      byebug
      items.each(&:save)
      @feed.update(last_fetched_at: DateTime.now)
    end
  end
end
