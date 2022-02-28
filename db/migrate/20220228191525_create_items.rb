class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.string :permalink, null: false
      t.datetime :published_at, null: false
      t.belongs_to :feed, null: false, foreign_key: true
      t.string :entry_id, null: false, index: true
      t.datetime :read_at
      t.datetime :bookmarked_at

      t.timestamps
    end
  end
end
