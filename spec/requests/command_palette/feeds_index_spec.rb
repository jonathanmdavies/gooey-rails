require 'rails_helper'

describe 'Feeds Index', type: :request do
  before(:each) do
    @account = create(:account)
    login_as(@account)
  end

  it 'returns feeds by created_at DESC by default' do
    create(:feed_with_unread_items, created_at: 1.day.ago, account: @account, name: 'Newest')
    create(:feed_with_unread_items, created_at: 2.days.ago, account: @account, name: 'Old')
    create(:feed_with_unread_items, created_at: 3.days.ago, account: @account, name: 'Oldest')
    get api_command_palette_feeds_path

    json_body = JSON.parse(response.body)
    names = json_body.map { |feed| feed['name'] }

    expect(names).to eq(['Newest', 'Old', 'Oldest'])
  end
end
