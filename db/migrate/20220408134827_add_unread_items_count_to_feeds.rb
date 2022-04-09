class AddUnreadItemsCountToFeeds < ActiveRecord::Migration[7.0]
  def self.up
    add_column :feeds, :unread_items_count, :integer, null: false, default: 0
  end

  def self.down
    remove_column :feeds, :unread_items_count
  end
end
