class Project < ApplicationRecord
  has_many :test_runs, dependent: :destroy

  before_create :assign_uuid

  private

  def assign_uuid
    self.uuid ||= SecureRandom.uuid
  end
end
