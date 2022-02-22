# require 'rails_helper'

# RSpec.describe FeedValidator do
#   context 'feed is valid http url' do
#     it 'returns feed object with valid url' do
#       VCR.use_cassette('valid_feed_url') do
#         feed_validator = FeedValidator.new('https://daringfireball.net/feeds/main')
#         byebug
#         expect(feed_validator.valid?.name).to eq('Daring Fireball')
#       end
#     end

#     it 'returns false with invalid feed url' do
#       VCR.use_cassette('invalid_feed_url') do
#         feed_validator = FeedValidator.new('https://daringfireball.net/feeds/mainerror')
#         expect(feed_validator.valid?).to be false
#       end
#     end
#   end
# end
