require 'rails_helper'

RSpec.describe 'Marking items as unread', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  context 'all' do
    it 'marks an item as unread' do
      feed = create(:feed, account: @account)
      item = create(:read_item, account: @account, feed: feed, published_at: 1.day.ago)
      next_item = create(:read_item, account: @account, feed: feed, published_at: 2.days.ago)

      visit item_path(item)
      click_on 'Mark as unread'

      expect(page).to have_selector 'h1', text: next_item.title
      expect(page.current_path).to eq(item_path(next_item))
    end

    it 'marks feed item as read' do
      feed = create(:feed, account: @account)
      item = create(:read_item, account: @account, feed: feed, published_at: 1.day.ago)
      next_item = create(:read_item, account: @account, feed: feed, published_at: 2.days.ago)

      visit feed_item_path(item.feed, item)
      click_on 'Mark as unread'

      expect(page).to have_selector 'h1', text: next_item.title
      expect(page.current_path).to eq(feed_item_path(next_item.feed, next_item))
    end
  end
end
