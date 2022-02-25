FactoryBot.define do
  factory :feed do
    status { [0, 1].sample }
    url { Faker::Internet.url(path: '/feed') }
    name { Faker::App.name }
    last_fetched_at { Faker::Time.between(from: 1.day.ago, to: Time.now) }
    association :account
  end
end
