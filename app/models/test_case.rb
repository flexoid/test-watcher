class TestCase < ApplicationRecord
  belongs_to :test_run
  has_many :test_steps, dependent: :destroy
end
