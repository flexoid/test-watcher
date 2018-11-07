class TestRunCollectionSerializer < ActiveModel::Serializer
  attributes :id, :uuid, :name, :project_id,
    :created_at, :updated_at, :finished_at
end
