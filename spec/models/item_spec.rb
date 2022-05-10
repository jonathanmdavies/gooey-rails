require 'rails_helper'

RSpec.describe Item, type: :model do
  context 'validations' do
    subject { build(:item) }

    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:content) }
    it { is_expected.to validate_presence_of(:permalink) }
    it { is_expected.to validate_presence_of(:entry_id) }
    it { is_expected.to validate_presence_of(:published_at) }
    it { is_expected.to validate_uniqueness_of(:entry_id).scoped_to(:feed_id) }
  end

  context 'sanitization' do
    it 'removes unsafe attributes from content' do
      item = create(:item, content: '<script>alert("XSS")</script><p>content</p>')

      expect(item.content).to eq('<p>content</p>')
    end
  end

  context '.unread' do
    it 'only returns unread items' do
      create(:unread_item, title: 'Unread Item')
      create(:read_item, title: 'Read Item')

      items = Item.unread.map(&:title)

      expect(items).to eq(["Unread Item"])
    end
  end

  context '.bookmarked' do
    it 'returns only bookmarked items' do
      create(:read_bookmarked_item, title: 'Bookmarked Title')
      create(:item, title: 'Not Bookmarked Title')

      bookmarked_items = Item.bookmarked.map(&:title)

      expect(bookmarked_items).to eq(['Bookmarked Title'])
    end
  end

  context '.unread_bookmarked' do
    it 'returns only unread bookmarked items' do
      create(:read_bookmarked_item, title: 'Read Bookmarked Title')
      create(:unread_bookmarked_item, title: 'Unread Bookmarked Title')

      bookmarked_items = Item.unread_bookmarked.map(&:title)

      expect(bookmarked_items).to eq(['Unread Bookmarked Title'])
    end
  end

  context '.published_today' do
    it 'returns items published today' do
      create(:item, published_at: Time.now, title: 'Published Today')
      create(:item, published_at: 1.day.ago, title: 'Published Yesterday')

      published_today = Item.published_today.map(&:title)

      expect(published_today).to eq(["Published Today"])
    end
  end
end
