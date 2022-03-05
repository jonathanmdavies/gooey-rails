require 'rails_helper'

RSpec.describe 'Reading unread items', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'shows all unread feed items' do
    feed = create(:feed, account: @account)
    item = create(:item, feed: feed)

    visit items_path

    expect(page).to have_content item.title
  end

  it 'shows all unread items for a feed' do
    visit root_path

    feed = create(:feed, account: @account)
    feed2 = create(:feed, account: @account)
    item = create(:item, feed: feed)
    item_2 = create(:item, feed: feed2)

    click_link feed.name

    expect(page).to have_content item.title
    expect(page).not_to have_content item_2.title
    expect(current_path).to eq feed_items_path(feed)
  end
end
