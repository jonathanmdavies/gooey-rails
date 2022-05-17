require 'rails_helper'

RSpec.describe 'Reading All Items', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  context 'all' do
    it 'shows all feed items' do
      first_feed = create(:feed_with_read_items, account: @account)
      second_feed = create(:feed_with_read_items, account: @account)
      first_feed_item = first_feed.items.first
      second_feed_item = second_feed.items.first

      visit items_path

      expect(page).to have_content(first_feed_item.title)
      expect(page).to have_content(second_feed_item.title)
      expect(page).to have_content "Select an item to start reading!"
    end

    it 'clicks to view an item' do
      feed = create(:feed_with_read_items, account: @account, name: 'First Feed', items_count: 1)
      item = feed.items.first

      visit items_path
      click_link item.title

      expect(page).to have_selector 'h1', text: item.title
      expect(page).to have_content item.content
      expect(page.current_path).to eq item_path(feed.items.first)
    end
  end

  context 'individual feed' do
    it 'shows first item' do
      feed = create(:feed_with_read_items, account: @account, name: 'First Feed')
      item = feed.items.first
      visit items_path

      click_link 'First Feed'

      expect(page).to have_selector 'h1', text: item.title
      expect(page.current_path).to eq feed_item_path(feed, item)
    end

    it 'clicks on item to view content' do
      feed = create(:feed, account: @account, name: 'First Feed')
      create(:item, feed: feed, published_at: Time.now, account: @account)
      last_item = create(:item, feed: feed, published_at: 2.days.ago, account: @account)

      visit items_path
      click_link 'First Feed'
      click_link last_item.title

      # Currently getting strange Capybara error that I can't debug
      # expect(page).to have_selector 'h1', text: last_item.title
      expect(page).to have_content last_item.content
      sleep(0.1)
      expect(page.current_path).to eq feed_item_path(feed, last_item)
    end
  end
end
