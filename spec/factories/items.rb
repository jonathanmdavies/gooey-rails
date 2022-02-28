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
  end
end
