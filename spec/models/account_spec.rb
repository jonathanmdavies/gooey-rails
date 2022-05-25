require 'rails_helper'

RSpec.describe Account, type: :model do
  context 'unread items counter cache' do
    it 'decrements counter cache when item is read' do
      account = create(:account)
      item = create(:unread_item, account: account)

      item.update(read_at: Time.now)
      account.reload

      expect(account.unread_items_count).to eq(0)
    end

    it 'increments counter cache when item is unread' do
      account = create(:account)
      item = create(:unread_item, account: account)

      item.update(read_at: nil)
      account.reload

      expect(account.unread_items_count).to eq(1)
    end
  end

  context 'bookmarks counter cache' do
    it 'increments counter cache when item is bookmarked' do
      account = create(:account)
      item = create(:item, account: account)

      item.update(bookmarked_at: Time.now)
      account.reload

      expect(account.bookmarks_count).to eq(1)
    end

    it 'decrements counter cache when item is un-bookmarked' do
      account = create(:account)
      item = create(:item, account: account, bookmarked_at: Time.now)

      item.update(bookmarked_at: nil)
      account.reload

      expect(account.bookmarks_count).to eq(0)
    end
  end

  context 'unread bookmarks counter cache' do
    it 'increments counter cache when unread item is bookmarked' do
      account = create(:account)
      item = create(:unread_item, account: account)

      item.update(bookmarked_at: Time.now)
      account.reload

      expect(account.unread_bookmarks_count).to eq(1)
    end

    it 'decrements counter cache when item is un-bookmarked' do
      account = create(:account)
      item = create(:unread_item, account: account, bookmarked_at: Time.now)

      item.update(bookmarked_at: nil)
      account.reload

      expect(account.unread_bookmarks_count).to eq(0)
    end
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:name) }
  end
end
