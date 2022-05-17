require 'rails_helper'

RSpec.describe ItemPage, type: :model do
  it 'returns correct page number for all items' do
    account = create(:account)
    create_list(:item, 90, account: account)
    item = create(:item, account: account, published_at: Time.now)

    page_number = ItemPage.new(account, item, target: :all).page

    expect(page_number).to eq(1)
  end

  it 'returns the correct page number for unread items' do
    account = create(:account)
    create_list(:unread_item, 90, account: account)
    create_list(:read_item, 60, account: account)
    item = create(:unread_item, account: account, published_at: Time.now)

    page_number = ItemPage.new(account, item, target: :all_unread).page

    expect(page_number).to eq(1)
  end

  it 'returns the correct page number for feed items' do
    account = create(:account)
    feed = create(:feed, account: account)
    create_list(:item, 90, account: account, feed: feed)
    item = create(:item, feed: feed, account: account, published_at: Time.now)

    page_number = ItemPage.new(account, item, target: :feed).page

    expect(page_number).to eq(1)
  end

  it 'returns the correct page number for unread feed items' do
    account = create(:account)
    feed = create(:feed, account: account)
    create_list(:unread_item, 90, account: account)
    create_list(:read_item, 90, account: account, feed: feed)
    item = create(:unread_item, feed: feed, account: account, published_at: Time.now)

    page_number = ItemPage.new(account, item, target: :unread_feed).page

    expect(page_number).to eq(1)
  end
end
