require 'rails_helper'

RSpec.describe FeedCreator, type: :model do
  context '.create_feed' do
    it 'returns successful result object' do
      account = create(:account)
      url = 'https://daringfireball.net/feeds/main'

      result = FeedCreator.new.create_feed(account, url: url)

      expect(result.created?).to eq(true)
      expect(result.feed.name).to eq("Daring Fireball")
      expect(result.feed.url).to eq("https://daringfireball.net/feeds/main")
    end

    it 'returns failure result object with invalid url' do
      account = create(:account)
      url = 'invalid_url'

      result = FeedCreator.new.create_feed(account, url: url)

      expect(result.created?).to eq(false)
      expect(result.feed.errors.messages[:url]).to include("We couldn't find a feed at that URL.")
    end

    it 'returns failure result object with for valid url without feed' do
      account = create(:account)
      url = 'https://daringfireball.net/feeds/main12312'

      result = FeedCreator.new.create_feed(account, url: url)

      expect(result.created?).to eq(false)
      expect(result.feed.errors.messages[:url]).to include("We couldn't find a feed at that URL.")
    end
  end
end
