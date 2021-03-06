class Account < ApplicationRecord
  has_person_name
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates_presence_of :name

  has_many :feeds, -> { order(created_at: :desc) }, dependent: :destroy
  has_many :items, -> { order(published_at: :desc) }
  has_many :unread_items, -> { order(published_at: :desc).unread }, class_name: 'Item'
end
