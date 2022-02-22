class Feed < ApplicationRecord
  belongs_to :account

  enum status: { active: 0, inactive: 1 }

  validates_presence_of :url, message: 'URL is required'
  validates_uniqueness_of :url, scope: :account_id, message: "You've already added this feed"
end
