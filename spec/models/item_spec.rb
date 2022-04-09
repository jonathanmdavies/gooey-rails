require 'rails_helper'

RSpec.describe Item, type: :model do
  context 'validations' do
    subject { FactoryBot.build(:item) }

    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:content) }
    it { is_expected.to validate_presence_of(:permalink) }
    it { is_expected.to validate_presence_of(:entry_id) }
    it { is_expected.to validate_presence_of(:published_at) }
    it { is_expected.to validate_uniqueness_of(:entry_id).scoped_to(:feed_id) }
  end

  context 'sanitization' do
    it 'removes unsafe attributes from content' do
      item = FactoryBot.create(:item, content: '<script>alert("XSS")</script><p>content</p>')

      expect(item.content).to eq('<p>content</p>')
    end
  end

  context '.unread' do
    it 'only returns unread items' do
      unread = create(:item, read_at: nil)
      create(:item, read_at: Time.now)

      expect(Item.unread).to eq([unread])
    end
  end

  context 'unread items counter cache' do
    it 'decrements counter cache when item is read' do
      feed = create(:feed)
      item = create(:unread_item, feed: feed)

      item.update(read_at: Time.now)
      feed.reload

      expect(feed.unread_items_count).to eq(0)
    end

    it 'increments counter cache when item is unread' do
      feed = create(:feed)
      item = create(:read_item, feed: feed)

      item.update(read_at: nil)
      feed.reload

      expect(feed.unread_items_count).to eq(1)
    end
  end
end
