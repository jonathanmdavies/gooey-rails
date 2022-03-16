require 'rails_helper'

RSpec.describe 'Marking items as read', type: :system do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'marks an item as read' do
    item = create(:item, :with_account, account: @account)

    visit feed_item_path(item.feed, item)
    click_on 'Mark as read'

    expect(page).to have_content 'Mark as unread'
  end

  it 'marks an item as unread' do
    item = create(:item, :with_account, account: @account, read_at: 1.day.ago)

    visit feed_item_path(item.feed, item)
    click_on 'Mark as unread'

    expect(page).to have_content 'Mark as read'
  end
end
