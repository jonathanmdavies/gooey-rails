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
    feed = create(:feed_with_items, account: @account, name: 'First Feed')
    visit root_path

    click_link 'First Feed'
    sleep(0.1) # Stops being flaky

    expect(page.current_path).to eq feed_items_path(feed)
  end
end
