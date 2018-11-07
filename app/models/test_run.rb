class TestRun < ApplicationRecord
  belongs_to :project
  has_many :features, dependent: :destroy
  has_many :test_cases, through: :features
end
