FactoryBot.define do
  factory :item do
    title { "MyString" }
    author { "MyString" }
    body { "MyText" }
    published_at { "2022-02-21 14:33:45" }
    entry_id { "MyString" }
    permalink { "MyString" }
    read { false }
    bookmarked { false }
    feed { nil }
  end
end
