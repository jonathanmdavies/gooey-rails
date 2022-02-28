require 'rails_helper'

RSpec.describe ItemCreator, type: :model do
  context '.create_item' do
    it 'returns successful result object' do
      feed = create(:feed)
      entry = double(
        :entry,
        title: 'The Title',
        url: 'url',
        published: Time.now,
        content: 'Content',
        entry_id: '123'
      )

      result = ItemCreator.new(entry: entry, feed: feed).create_item

      expect(result.created?).to eq(true)
    end

    it 'returns failure result object if item invalid' do
      feed = create(:feed)
      entry = double(
        :entry,
        title: '',
        url: '',
        published: '',
        content: '',
        entry_id: ''
      )

      result = ItemCreator.new(entry: entry, feed: feed).create_item

      expect(result.created?).to eq(false)
    end
  end
end
