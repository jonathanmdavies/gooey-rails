class Item < ApplicationRecord
  belongs_to :feed

  validates_uniqueness_of :entry_id, scope: :feed_id
end
