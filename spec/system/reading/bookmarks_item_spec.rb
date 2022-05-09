require 'rails_helper'

RSpec.describe 'Bookmarking an item', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'bookmarks an item' do
    feed = create(:feed, account: @account)
    item = create(:unread_item, account: @account, feed: feed)

    visit item_path(item)
    click_on 'Bookmark'

    expect(page).to have_content 'Saved for later'
  end

  it 'removes a bookmark from an item' do
    feed = create(:feed, account: @account)
    item = create(:unread_item, account: @account, feed: feed, bookmarked_at: Time.now)

    visit item_path(item)
    click_on 'Remove Bookmark'

    expect(page).to have_content 'No longer saved for later'
  end
end
