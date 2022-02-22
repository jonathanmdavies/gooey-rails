FactoryBot.define do
  factory :feed do
    status { :active }
    url { Faker::Internet.url(path: '/feed') }
    name { "My Feed" }
    last_fetched_at { 1.day.ago }
    association :account
  end
end
