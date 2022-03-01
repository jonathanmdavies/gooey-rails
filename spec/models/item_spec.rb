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
end