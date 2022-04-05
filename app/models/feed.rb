class Feed < ApplicationRecord
  belongs_to :account
  has_many :items, -> { order(published_at: :desc) }, dependent: :destroy
  has_many :unread_items, -> { unread }, class_name: "Item"

  enum status: { active: 0, inactive: 1 }

  validates_presence_of :url, message: 'URL is required'
  validates_uniqueness_of :url, scope: :account_id, message: "You've already added this feed"

  def self.order_by_created_at_and_item_published_at
    order(created_at: :desc).includes(:items)
  end

  def self.unread
    where(items: { read_at: nil })
  end
end
