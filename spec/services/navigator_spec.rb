require 'rails_helper'
include Rails.application.routes.url_helpers

RSpec.describe Navigator, type: :model do
  context '.navigate' do
    it 'returns first item across all feeds' do
      feed = create(:feed)
      recent_item = create(:read_item, feed: feed, published_at: Time.now)
      create(:unread_item, feed: feed, published_at: 2.days.ago)

      result = Navigator.new(item: recent_item, scope: :all, target: :first).navigate

      expect(result).to eq(item_path(recent_item))
    end

    it 'return last item across all feeds' do
      feed = create(:feed)
      recent_item = create(:item, feed: feed, published_at: Time.now)
      old_item = create(:item, feed: feed, published_at: 2.days.ago)

      result = Navigator.new(item: recent_item, scope: :all, target: :last).navigate

      expect(result).to eq(item_path(old_item))
    end

    it 'returns first item across unread feeds' do
      feed = create(:feed)
      read_recent_item = create(:item, feed: feed, published_at: Time.now, read_at: Time.now)
      unread_old_item = create(:item, feed: feed, published_at: 2.days.ago)

      result = Navigator.new(item: read_recent_item, scope: :all_unread, target: :first).navigate

      expect(result).to eq(unread_item_path(unread_old_item))
    end

    it 'returns last item across unread feeds' do
      feed = create(:feed)
      read_recent_item = create(:item, feed: feed, published_at: Time.now)
      unread_old_item = create(:item, feed: feed, published_at: 2.days.ago)

      result = Navigator.new(item: read_recent_item, scope: :all_unread, target: :last).navigate

      expect(result).to eq(unread_item_path(unread_old_item))
    end

    it 'returns first item across a single feed' do
      item = create(:item)
      result = Navigator.new(item: item, scope: :feed, target: :first).navigate

      expect(result).to eq(feed_item_path(item.feed, item))
    end

    it 'returns next item for unread feed' do
      feed = create(:feed)
      read_recent_item = create(:item, feed: feed, published_at: Time.now)
      unread_old_item = create(:item, feed: feed, published_at: 2.days.ago)

      result = Navigator.new(item: read_recent_item, scope: :unread_feed, target: :next).navigate

      expect(result).to eq(unread_feed_item_path(feed, unread_old_item))
    end
  end
end
