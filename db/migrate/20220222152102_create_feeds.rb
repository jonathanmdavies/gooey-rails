class CreateFeeds < ActiveRecord::Migration[7.0]
  def change
    create_table :feeds do |t|
      t.integer :status, default: 0, null: false
      t.belongs_to :account, null: false, foreign_key: true
      t.string :url, null: false
      t.string :name, null: false
      t.datetime :last_fetched_at

      t.timestamps
    end
  end
end
