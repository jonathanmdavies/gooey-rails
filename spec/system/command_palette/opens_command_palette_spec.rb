require 'rails_helper'

RSpec.describe 'Open Command Palette', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'uses keyboard shortcut command-k to open' do
    visit root_path

    find("body").send_keys [:command, 'k']

    expect(page).to have_content('COMMAND PALETTE')
  end

  it 'presses escape key to close' do
    visit root_path
    find("body").send_keys [:command, 'k']

    find("body").send_keys [:escape]

    expect(page).not_to have_content('COMMAND PALETTE')
  end

  it 'selects a feed and is redirected to the first item' do
    feed = create(:feed, account: @account)
    item = create(:unread_item, feed: feed, account: @account)
    visit root_path

    find("body").send_keys [:command, 'k']
    fill_in 'search', with: feed.name
    within('.combobox-options') do
      # Headless UI renders options as li, so there is no link to click.
      find("span", text: feed.name).click
    end

    sleep(0.1)
    expect(page).to have_content(feed.name)
    expect(page).to have_content(feed.items.first.title)
    expect(page.current_path).to eq(unread_feed_item_path(feed, item))
  end
end
