require 'rails_helper'

describe 'Managing Feeds', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'adds a new feed' do
    VCR.use_cassette :valid_feed do
      visit feeds_path
      find('#new-feed-button').click
      fill_in 'URL', with: 'https://daringfireball.net/feeds/main'
      click_on 'Add Feed'

      expect(page).to have_content('Feed was successfully added.')
    end
  end

  it 'views list of feeds' do
    feed = create(:feed, account: @account)

    visit feeds_path

    expect(page).to have_content feed.name
  end

  it 'removes a feed' do
    feed = create(:feed, account: @account)

    visit feeds_path
    find('.feed-menu-button').click
    click_on 'Unsubscribe'

    expect(page).not_to have_content feed.name
    expect(page).to have_content 'Feed was successfully removed.'
  end
end
