require 'rails_helper'

RSpec.describe FeedFetcher, type: :model do
  context '.fetch_items' do
    it 'adds new items' do
      account = create(:account)
      feed = create(
        :feed,
        account: account,
        name: 'Daring Fireball',
        url: 'https://daringfireball.net/feeds/main',
        last_fetched_at: 1.week.ago
      )

      feed_fetcher = FeedFetcher.new(feed: feed)

      allow(feed_fetcher).to receive(:get_entries) do
        [
          double(
            :entry,
            title: 'New Item',
            url: 'url',
            published: 1.day.ago,
            content: 'Content',
            entry_id: '1'
          ),
        ]
      end

      result = feed_fetcher.fetch_items

      expect(result.successful?).to eq(true)
      expect(result.fetched_items_count).to eq(1)
    end

    it 'does not import items older than feed last_fetched_at date' do
      account = create(:account)
      feed = create(:feed, account: account, last_fetched_at: 7.days.ago)
      feed_fetcher = FeedFetcher.new(feed: feed)
      allow(feed_fetcher).to receive(:get_entries) do
        [
          double(
            :entry,
            title: 'New Item',
            url: 'url',
            published: 1.day.ago,
            content: 'Content',
            entry_id: '1'
          ),
          double(
            :entry,
            title: 'Old Item',
            url: 'url',
            published: 2.weeks.ago,
            content: 'Content',
            entry_id: '1'
          ),
        ]
      end

      result = feed_fetcher.fetch_items

      expect(result.fetched_items_count).to eq(1)
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
