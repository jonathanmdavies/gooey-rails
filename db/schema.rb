# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_02_28_191525) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["reset_password_token"], name: "index_accounts_on_reset_password_token", unique: true
  end

  create_table "feeds", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.bigint "account_id", null: false
    t.string "url", null: false
    t.string "name", null: false
    t.datetime "last_fetched_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_feeds_on_account_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "title", null: false
    t.text "content", null: false
    t.string "permalink", null: false
    t.datetime "published_at", null: false
    t.bigint "feed_id", null: false
    t.string "entry_id", null: false
    t.datetime "read_at"
    t.datetime "bookmarked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entry_id"], name: "index_items_on_entry_id"
    t.index ["feed_id"], name: "index_items_on_feed_id"
  end

  add_foreign_key "feeds", "accounts"
  add_foreign_key "items", "feeds"
end
