require 'rails_helper'

describe 'Managing Feeds', type: :system do
  it 'adds a new feed' do
    login_as(create(:account))

    visit feeds_path
    find('#new-feed-button').click
    fill_in 'URL', with: 'https://daringfireball.net/feeds/main'
    click_on 'Add Feed'

    expect(page).to have_content('Feed was successfully added.')
  end
end
