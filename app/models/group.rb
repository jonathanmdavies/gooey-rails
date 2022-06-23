class Group < ApplicationRecord
  belongs_to :account
  acts_as_list scope: :account

  validates_presence_of :name
end
