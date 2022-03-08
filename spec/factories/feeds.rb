FactoryBot.define do
  factory :feed do
    status { [0, 1].sample }
    url { Faker::Internet.url(path: '/feed') }
    name { Faker::App.name }
    last_fetched_at { Faker::Time.between(from: 1.day.ago, to: Time.now) }
    association :account

    factory :feed_with_items do
      transient do
        items_count { 1 }
      end

      after(:create) do |feed, evaluator|
        create_list(:item, evaluator.items_count, feed: feed)
      end
    end
  end
end
