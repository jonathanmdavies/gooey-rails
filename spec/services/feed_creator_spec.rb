require 'rails_helper'

RSpec.describe FeedCreator, type: :model do
  context '.create_feed' do
    it 'returns successful result object' do
      VCR.use_cassette :valid_feed do
        account = create(:account)
        url = 'https://daringfireball.net/feeds/main'

        result = FeedCreator.new.create_feed(account, url: url)

        expect(result.created?).to eq(true)
        expect(result.feed.name).to eq("Daring Fireball")
        expect(result.feed.url).to eq("https://daringfireball.net/feeds/main")
      end
    end

    it 'sets correct last_fetched_date for initial fetch' do
      VCR.use_cassette :valid_feed do
        freeze_time do
          account = create(:account)
          url = 'https://daringfireball.net/feeds/main'

          result = FeedCreator.new.create_feed(account, url: url, initially_fetch: :one_week_ago)

          expect(result.feed.last_fetched_at).to eq(7.days.ago)
        end
      end
    end

    it 'returns failure result object with invalid url' do
      account = create(:account)
      url = 'wefwef'

      result = FeedCreator.new.create_feed(account, url: url)

      expect(result.created?).to eq(false)
      expect(result.feed.errors.messages[:url]).to include("We couldn't find a feed at that URL.")
    end

    it 'returns failure result object with for valid url without feed' do
      VCR.use_cassette :valid_url_without_feed do
        account = create(:account)
        url = 'https://daringfireball.net/feeds/main12312'

        result = FeedCreator.new.create_feed(account, url: url)

        expect(result.created?).to eq(false)
        expect(result.feed.errors.messages[:url]).to include("We couldn't find a feed at that URL.")
      end
    end
  end
end
