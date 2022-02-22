class Feed < ApplicationRecord
  belongs_to :account

  validates_presence_of :url, message: 'URL is required'
  validates_uniqueness_of :url, scope: :account_id, message: 'URL is already in use'
end
