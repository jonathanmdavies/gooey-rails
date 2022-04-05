class Account < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :feeds, -> { order(created_at: :desc) }, dependent: :destroy
  has_many :items, -> { order(published_at: :desc) }, through: :feeds
  has_many :unread_items, -> { unread }, through: :feeds, class_name: 'Item'
end
