FactoryBot.define do
  factory :feed do
    status { :active }
    url { Faker::Internet.url(path: '/feed') }
    name { Faker::App.name }
    last_fetched_at { Faker::Time.between(from: 1.day.ago, to: Time.now) }
    association :account

    factory :feed_with_unread_items do
      transient do
        items_count { 1 }
      end

      after(:create) do |feed, evaluator|
        create_list(:unread_item, evaluator.items_count, feed: feed, account: feed.account)
      end
    end

    factory :feed_with_read_items do
      transient do
        items_count { 1 }
      end

      after(:create) do |feed, evaluator|
        create_list(:read_item, evaluator.items_count, feed: feed, account: feed.account)
      end
    end
  end
end
