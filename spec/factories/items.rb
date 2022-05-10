FactoryBot.define do
  factory :item do
    sequence(:title) { |n| "Item #{n}" }
    content { "Content" }
    permalink { Faker::Internet.url }
    published_at { 1.day.ago }
    sequence(:entry_id) { |n| "entry-id-#{n}" }
    read_at { nil }
    bookmarked_at { nil }
    association :feed
    association :account

    factory :read_item do
      read_at { 1.day.ago }
    end

    factory :unread_item do
      read_at { nil }
    end

    factory :read_bookmarked_item do
      read_at { 1.day.ago }
      bookmarked_at { 1.day.ago }
    end

    factory :unread_bookmarked_item do
      bookmarked_at { 1.day.ago }
    end
  end

  trait :with_account do
    transient do
      account { nil }
    end

    feed do
      association :feed, account: account
    end
  end
end
