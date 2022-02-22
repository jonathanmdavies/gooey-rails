FactoryBot.define do
  factory :feed do
    status { 1 }
    account { nil }
    url { "MyString" }
    name { "MyString" }
    last_fetched_at { "2022-02-22 15:21:02" }
  end
end
