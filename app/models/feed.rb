class Feed < ApplicationRecord
  belongs_to :account
  has_many :items, dependent: :destroy

  enum status: { active: 0, inactive: 1 }

  validates_presence_of :url, message: 'URL is required'
  validates_uniqueness_of :url, scope: :account_id, message: "You've already added this feed"

  def first_item
    items.first&.id
  end

  def self.order_by_created_at_and_item_published_at
    order(created_at: :desc).includes(:items).order("items.published_at DESC")
  end
end
