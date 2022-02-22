require 'rails_helper'

RSpec.describe FeedBuilder do
  before do
    @current_account = FactoryBot.build(:account)
  end

  context 'feed is invalid http url' do
    it 'returns error if invalid url' do
      feed_builder = FeedBuilder.new(@current_account, 'wefwe')
      expect(feed_builder.perform).to include('Invalid port number')
    end

    it 'returns error if unable to parse url' do
      VCR.use_cassette('invalid_feed_url') do
        feed_builder = FeedBuilder.new(@current_account, 'https://daringfireball.net/feeds/mainerror')
        expect(feed_builder.perform).to include('No valid parser for XML')
      end
    end
  end

  context 'feed is valid http url' do
    it 'creates feed object if valid' do
      VCR.use_cassette('valid_feed_url') do
        @current_account = FactoryBot.create(:account)
        feed_builder = FeedBuilder.new(@current_account, 'https://daringfireball.net/feeds/main')
        feed = feed_builder.perform

        expect(feed.name).to eq("Daring Fireball")
        expect(feed.url).to eq("https://daringfireball.net/feeds/main")
      end
    end
  end
end
