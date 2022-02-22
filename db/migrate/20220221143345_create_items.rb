class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :title
      t.string :author
      t.text :body
      t.datetime :published_at
      t.string :entry_id
      t.string :permalink
      t.boolean :read
      t.boolean :bookmarked
      t.belongs_to :feed, null: false, foreign_key: true

      t.timestamps
    end
  end
end
