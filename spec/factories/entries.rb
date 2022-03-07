# This is a non-active record object to make
# testing RSS entries easier and avoids having to build a large
# number of doubles throughout the spec suite

# usage: `build(:entry)` (and pass in override values as necessary)

class Entry
  attr_reader :title, :content, :url, :published, :entry_id
  def initialize(title, content, url, published, entry_id)
    @title = title
    @content = content
    @url = url
    @published = published
    @entry_id = entry_id
  end
end

FactoryBot.define do
  factory :entry do
    sequence(:title) { |n| "Entry #{n}" }
    content { "Content" }
    url { Faker::Internet.url }
    published { 1.day.ago }
    sequence(:entry_id) { |n| "entry-id-#{n}" }

    skip_create
    initialize_with { new(title, content, url, published, entry_id) }
  end
end
