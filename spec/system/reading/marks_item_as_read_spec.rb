require 'rails_helper'

RSpec.describe 'Marking items as read', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  context 'all' do
    it 'marks an item as read' do
      feed = create(:feed, account: @account)
      item = create(:unread_item, :with_account, account: @account, feed: feed, published_at: 1.day.ago)
      next_item = create(:read_item, :with_account, account: @account, feed: feed, published_at: 2.days.ago)

      visit item_path(item)
      click_on 'Mark as read'

      expect(page).to have_selector 'h1', text: next_item.title
      expect(page.current_path).to eq(item_path(next_item))
    end

    it 'marks feed item as read' do
      feed = create(:feed, account: @account)
      item = create(:unread_item, :with_account, account: @account, feed: feed, published_at: 1.day.ago)
      next_item = create(:read_item, :with_account, account: @account, feed: feed, published_at: 2.days.ago)

      visit feed_item_path(item.feed, item)
      click_on 'Mark as read'

      expect(page).to have_selector 'h1', text: next_item.title
      expect(page.current_path).to eq(feed_item_path(next_item.feed, next_item))
    end
  end

  context 'unread' do
    it 'marks item as read' do
      feed = create(:feed, account: @account)
      item = create(:unread_item, :with_account, account: @account, feed: feed, published_at: 1.day.ago)
      next_item = create(:unread_item, :with_account, account: @account, feed: feed, published_at: 2.days.ago)

      visit unread_item_path(item)
      click_on 'Mark as read'

      expect(page).to have_selector 'h1', text: next_item.title
      expect(page).not_to have_content item.title
      expect(page.current_path).to eq(unread_item_path(next_item))
    end

    it 'marks feed item as read' do
      feed = create(:feed, account: @account)
      item = create(:unread_item, :with_account, account: @account, feed: feed, published_at: 1.day.ago)
      next_item = create(:unread_item, :with_account, account: @account, feed: feed, published_at: 2.days.ago)

      visit unread_feed_item_path(item.feed, item)
      click_on 'Mark as read'

      expect(page).to have_selector 'h1', text: next_item.title
      expect(page).not_to have_content item.title
      expect(page.current_path).to eq(unread_feed_item_path(next_item.feed, next_item))
    end
  end
end
