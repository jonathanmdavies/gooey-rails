require 'rails_helper'

RSpec.describe Feed, type: :model do
  context '.order_by_created_at_and_published_at' do
    it 'correctly orders by created_at and published_at' do
      account = create(:account)
      create(:feed, created_at: 1.week.ago, account: account, name: 'Old')
      new_feed = create(:feed, created_at: 1.day.ago, account: account, name: 'New')

      create(:item, feed: new_feed, published_at: 3.days.ago, title: 'Oldest Post')
      create(:item, feed: new_feed, published_at: 2.day.ago, title: 'Newest Post')

      feeds = account.feeds.order_by_created_at_and_item_published_at

      item_names = feeds.first.items.map(&:title)
      feed_names = feeds.map(&:name)
      expect(feed_names).to eq(['New', 'Old'])
      expect(item_names).to eq(["Newest Post", "Oldest Post"])
    end
  end
end
