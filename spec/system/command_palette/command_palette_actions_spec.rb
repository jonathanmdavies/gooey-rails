require 'rails_helper'

RSpec.describe 'Command Palette Actions', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'marks an item as read' do
    feed = create(:feed, account: @account)
    item = create(:unread_item, feed: feed, account: @account)
    visit unread_feed_item_path(feed, item)

    find("body").send_keys [:command, 'k']
    fill_in 'search', with: 'Mark as Read'
    within('.combobox-options') do
      find("span", text: 'Mark as Read').click
    end

    expect(page).to have_content('Marked as Read')
  end

  it 'marks an item as unread' do
    feed = create(:feed, account: @account)
    item = create(:read_item, feed: feed, account: @account)
    visit feed_item_path(feed, item)

    find("body").send_keys [:command, 'k']
    fill_in 'search', with: 'Mark as Unread'
    within('.combobox-options') do
      find("span", text: 'Mark as Unread').click
    end

    expect(page).to have_content('Marked as Unread')
  end

  it 'bookmarks an item' do
    feed = create(:feed, account: @account)
    item = create(:read_item, feed: feed, account: @account)
    visit feed_item_path(feed, item)

    find("body").send_keys [:command, 'k']
    fill_in 'search', with: 'Bookmark'
    within('.combobox-options') do
      find("span", text: 'Bookmark').click
    end

    expect(page).to have_content('Saved for later')
  end

  it 'unbookmarks an item' do
    feed = create(:feed, account: @account)
    item = create(:read_bookmarked_item, feed: feed, account: @account)
    visit feed_item_path(feed, item)

    find("body").send_keys [:command, 'k']
    fill_in 'search', with: 'Remove Bookmark'
    within('.combobox-options') do
      find("span", text: 'Remove Bookmark').click
    end

    expect(page).to have_content('No longer saved for later')
  end
end
