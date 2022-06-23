class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.references :account, null: false, foreign_key: true
      t.integer :position

      t.timestamps
    end
  end
end
