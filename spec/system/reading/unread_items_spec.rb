require 'rails_helper'

RSpec.describe 'Reading Unread Items', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  context 'all' do
    it 'shows all unread feed items' do
      first_feed = create(:feed_with_unread_items, account: @account)
      second_feed = create(:feed_with_unread_items, account: @account)
      first_feed_item = first_feed.items.first
      second_feed_item = second_feed.items.first

      visit unread_items_path

      expect(page).to have_content(first_feed_item.title)
      expect(page).to have_content(second_feed_item.title)
      expect(page).to have_content "Select an item to start reading!"
    end

    it 'clicks to view an unread item' do
      feed = create(:feed_with_unread_items, account: @account, name: 'First Feed', items_count: 1)
      item = feed.items.first

      visit unread_items_path
      click_link item.title

      expect(page).to have_selector 'h1', text: item.title
      expect(page).to have_content item.content
      expect(page.current_path).to eq unread_item_path(feed.items.first)
    end
  end
end
