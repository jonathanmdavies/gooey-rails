class AddUnreadItemsCountToAccount < ActiveRecord::Migration[7.0]
  def change
    add_reference :items, :account, index: true
    add_column :accounts, :unread_items_count, :integer, default: 0
    add_column :accounts, :unread_bookmarks_count, :integer, default: 0
    add_column :accounts, :bookmarks_count, :integer, default: 0
  end
end
