class Item < ApplicationRecord
  belongs_to :feed

  validates_presence_of :title
  validates_presence_of :content
  validates_presence_of :permalink
  validates_presence_of :entry_id
  validates_presence_of :published_at
  validates_uniqueness_of :entry_id, scope: :feed_id

  html_fragment :content, scrub: :prune

  scope :unread, -> { where(read_at: nil) }

  counter_culture :feed,
    column_name: proc { |item| item.read_at.nil? ? 'unread_items_count' : nil },
    column_names: { Item.unread => :unread_items_count }
end
