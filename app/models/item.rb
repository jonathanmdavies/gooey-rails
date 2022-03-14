class Item < ApplicationRecord
  belongs_to :feed

  validates_presence_of :title
  validates_presence_of :content
  validates_presence_of :permalink
  validates_presence_of :entry_id
  validates_presence_of :published_at
  validates_uniqueness_of :entry_id, scope: :feed_id

  html_fragment :content, scrub: :prune

  def self.unread
    where(read_at: nil)
  end

  def next
    feed.items.order(published_at: :desc).where('published_at < ?', published_at).first&.id
  end

  def previous
    feed.items.order(published_at: :desc).where('published_at > ?', published_at).last&.id
  end
end
