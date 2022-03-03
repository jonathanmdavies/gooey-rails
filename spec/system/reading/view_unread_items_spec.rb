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
end
