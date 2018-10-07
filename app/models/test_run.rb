class TestRun < ApplicationRecord
  belongs_to :project
  has_many :features, dependent: :destroy
end
