class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :uuid, :name, :created_at, :updated_at

  attribute :stats do
    {
      test_cases: ProjectStats.new(object).test_cases
    }
  end
end
