class CreateFeeds < ActiveRecord::Migration[7.0]
  def change
    create_table :feeds do |t|
      t.integer :status
      t.belongs_to :account, null: false, foreign_key: true
      t.string :url

      t.timestamps
    end
  end
end
