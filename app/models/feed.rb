class Feed < ApplicationRecord
  belongs_to :account
  has_many :items, -> { order(published_at: :desc) }, dependent: :destroy
  has_many :unread_items, -> { unread.order(published_at: :desc) }, class_name: 'Item'

  enum status: { active: 0, inactive: 1 }

  validates_presence_of :url, message: 'URL is required'
  validates_uniqueness_of :url, scope: :account_id, message: "You've already added this feed"
end
