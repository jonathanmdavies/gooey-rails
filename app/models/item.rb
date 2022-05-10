class Item < ApplicationRecord
  belongs_to :feed
  belongs_to :account

  validates_presence_of :title
  validates_presence_of :content
  validates_presence_of :permalink
  validates_presence_of :entry_id
  validates_presence_of :published_at
  validates_uniqueness_of :entry_id, scope: :feed_id

  html_fragment :content, scrub: :prune

  scope :unread, -> { where(read_at: nil) }
  scope :bookmarked, -> { where.not(bookmarked_at: nil) }
  scope :unread_bookmarked, -> { where(read_at: nil).where.not(bookmarked_at: nil) }
  scope :published_today, -> { where(published_at: Date.today.beginning_of_day..Date.today.end_of_day) }

  # Unread Feed Items Counter Cache
  counter_culture :feed,
    column_name: proc { |item| item.read_at.nil? ? 'unread_items_count' : nil },
    column_names: { Item.unread => :unread_items_count }

  # Account Unread Items Counter Cache
  counter_culture :account,
    column_name: proc { |item| item.read_at.nil? ? 'unread_items_count' : nil },
    column_names: { Item.unread => :unread_items_count }

  # Account Bookmarks Counter Cache
  counter_culture :account,
    column_name: proc { |item| item.bookmarked_at.present? ? 'bookmarks_count' : nil },
    column_names: { Item.bookmarked => :bookmarks_count }

  # Account Unread Bookmarks Counter Cache
  counter_culture :account,
    column_name: proc { |item| item.bookmarked_at.present? && item.read_at.nil? ? 'unread_bookmarks_count' : nil },
    column_names: { Item.unread_bookmarked => :unread_bookmarks_count }
end
