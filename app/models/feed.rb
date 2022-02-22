class Feed < ApplicationRecord
  belongs_to :account
  has_many :items, dependent: :destroy

  validates_uniqueness_of :url, scope: :account_id, message: "You're already subscribed"
  validates_presence_of :url, message: "Please enter a valid feed URL"
end
