class Card < ActiveRecord::Base
  validates :name, :year, presence: true
  validates :year, numericality: {only_integer: true}
end
