require 'rails_helper'

RSpec.describe FeedFetcher, type: :model do
  context '.fetch_items' do
    it 'adds new items' do
      feed = create(
        :feed,
        name: 'Daring Fireball',
        url: 'https://daringfireball.net/feeds/main',
        last_fetched_at: 1.week.ago
      )

      feed_fetcher = FeedFetcher.new(feed: feed)

      allow(feed_fetcher).to receive(:get_entries) do
        [build(:entry)]
      end

      result = feed_fetcher.fetch_items

      expect(result.successful?).to eq(true)
      expect(result.fetched_items_count).to eq(1)
    end

    it 'does not import items older than feed last_fetched_at date' do
      feed = create(:feed, last_fetched_at: 7.days.ago)
      feed_fetcher = FeedFetcher.new(feed: feed)
      allow(feed_fetcher).to receive(:get_entries) do
        [
          build(:entry, published: 1.day.ago),
          build(:entry, published: 2.weeks.ago),
        ]
      end

      result = feed_fetcher.fetch_items

      expect(result.fetched_items_count).to eq(1)
    end

    it 'sets feed to inactive if error' do
      feed = create(
        :feed,
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
