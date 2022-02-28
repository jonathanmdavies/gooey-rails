class ItemCreator
  def initialize(entry:, feed:)
    @entry = entry
    @feed = feed
  end

  def create_item
    item = Item.create(
      title: @entry.title,
      permalink: @entry.url,
      published_at: @entry.published,
      content: @entry.content,
      feed_id: @feed.id,
      entry_id: @entry.entry_id
    )

    Result.new(created: item.valid?, item: item)
  end

  class Result
    attr_reader :item
    def initialize(created:, item:)
      @created = created
      @item = item
    end

    def created?
      @created
    end
  end
end
