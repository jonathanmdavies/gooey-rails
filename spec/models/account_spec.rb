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
end
