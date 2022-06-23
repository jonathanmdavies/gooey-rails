FactoryBot.define do
  factory :group do
    name { "Group" }
    association :account
  end
end
