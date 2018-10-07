class Feature < ApplicationRecord
  belongs_to :test_run
  has_many :test_cases, dependent: :destroy
end
