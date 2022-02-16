FactoryBot.define do
  factory :account do
    first_name { 'John' }
    last_name { 'Smith' }
    sequence(:email) { |n| "account#{n}@example.com" }
    password { 'password' }
  end
end
