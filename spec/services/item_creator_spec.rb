require 'rails_helper'

RSpec.describe ItemCreator, type: :model do
  context '.create_item' do
    it 'returns successful result object' do
      feed = create(:feed)
      entry = build(:entry)

      result = ItemCreator.new(entry: entry, feed: feed).create_item

      expect(result.created?).to eq(true)
    end

    it 'returns failure result object if item invalid' do
      feed = create(:feed)
      entry = build(:entry, title: nil)

      result = ItemCreator.new(entry: entry, feed: feed).create_item

      expect(result.created?).to eq(false)
    end

    it 'uses summary if no content present' do
      feed = create(:feed)
      entry = build(:entry, content: nil, summary: 'summary')

      result = ItemCreator.new(entry: entry, feed: feed).create_item

      expect(result.item.content).to eq(entry.summary)
    end
  end
end
