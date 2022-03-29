require 'rails_helper'

RSpec.describe Feed, type: :model do
  context '.order_by_created_at_and_item_published_at' do
    it 'returns feeds ordered by created_at and items by published_at' do
      feed1 = create(:feed, created_at: 1.day.ago, name: 'Latest')
      feed2 = create(:feed, created_at: 2.days.ago, name: 'Oldest')
      create(:item, feed: feed1, published_at: 3.days.ago, title: 'Oldest Item')
      create(:item, feed: feed1, published_at: 1.day.ago, title: 'Latest Item')
      create(:item, feed: feed2, published_at: 4.days.ago, title: 'Oldest Item')
      create(:item, feed: feed2, published_at: 2.days.ago, title: 'Latest Item')

      feeds = Feed.order_by_created_at_and_item_published_at

      expect(feeds.map(&:name)).to eq(['Latest', 'Oldest'])
      expect(feeds.first.items.map(&:title)).to eq(['Latest Item', 'Oldest Item'])
      expect(feeds.last.items.map(&:title)).to eq(['Latest Item', 'Oldest Item'])
    end
  end
end
