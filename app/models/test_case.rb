class TestCase < ApplicationRecord
  belongs_to :feature
  has_many :test_steps, dependent: :destroy
end
