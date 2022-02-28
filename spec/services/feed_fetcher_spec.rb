require 'rails_helper'

RSpec.describe FeedFetcher, type: :model do
  context '.fetch_items' do
    it 'adds new items' do
      account = create(:account)
      feed = create(
        :feed,
        account: account,
        name: 'Daring Fireball',
        url: 'https://daringfireball.net/feeds/main'
      )

      VCR.use_cassette(:valid_feed) do
        result = FeedFetcher.new(feed: feed).fetch_items

        expect(result.successful?).to eq(true)
        expect(result.fetched_items_count).to eq(48)
      end
    end

    it 'sets feed to inactive if error' do
      account = create(:account)
      feed = create(
        :feed,
        account: account,
        name: 'Daring Fireball',
        url: 'https://daringfireball.net/feeds/main12312'
      )

      VCR.use_cassette('valid_url_without_feed') do
        result = FeedFetcher.new(feed: feed).fetch_items

        expect(result.successful?).to eq(false)
        expect(result.feed.status).to eq('inactive')
        expect(result.fetched_items_count).to eq(0)
      end
    end
  end
end
