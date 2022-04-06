require 'rails_helper'
include Rails.application.routes.url_helpers

RSpec.describe Navigator, type: :model do
  context '.navigate' do
    context 'all' do
      it 'returns next item' do
        feed = create(:feed)
        item = create(:item, feed: feed, published_at: Time.now)
        next_item = create(:item, feed: feed, published_at: 1.day.ago)

        result = Navigator.new(item: item, scope: :all, target: :next).navigate

        expect(result).to eq(item_path(next_item))
      end

      it 'returns next feed item' do
        feed = create(:feed)
        item = create(:item, feed: feed, published_at: Time.now)
        next_item = create(:item, feed: feed, published_at: 1.day.ago)

        result = Navigator.new(item: item, scope: :feed, target: :next).navigate

        expect(result).to eq(feed_item_path(next_item.feed, next_item))
      end
    end

    context 'unread' do
      it 'returns next unread item' do
        feed = create(:feed)
        item = create(:unread_item, feed: feed, published_at: Time.now)
        next_item = create(:unread_item, feed: feed, published_at: 1.day.ago)

        result = Navigator.new(item: item, scope: :all_unread, target: :next).navigate

        expect(result).to eq(unread_item_path(next_item))
      end

      it 'returns next unread feed item' do
        feed = create(:feed)
        item = create(:unread_item, feed: feed, published_at: Time.now)
        next_item = create(:unread_item, feed: feed, published_at: 1.day.ago)

        result = Navigator.new(item: item, scope: :unread_feed, target: :next).navigate

        expect(result).to eq(unread_feed_item_path(next_item.feed, next_item))
      end
    end

    context 'no next item' do
      it 'returns root' do
        feed = create(:feed)
        item = create(:item, feed: feed, published_at: Time.now)

        result = Navigator.new(item: item, scope: :all, target: :next).navigate

        expect(result).to eq(root_path)
      end
    end
  end
end
