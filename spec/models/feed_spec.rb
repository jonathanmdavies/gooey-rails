require 'rails_helper'

RSpec.describe Feed, type: :model do
  context 'unread items counter cache' do
    it 'decrements counter cache when item is read' do
      feed = create(:feed)
      item = create(:unread_item, feed: feed)

      item.update(read_at: Time.now)
      feed.reload

      expect(feed.unread_items_count).to eq(0)
    end

    it 'increments counter cache when item is unread' do
      feed = create(:feed)
      item = create(:read_item, feed: feed)

      item.update(read_at: nil)
      feed.reload

      expect(feed.unread_items_count).to eq(1)
    end
  end
end
