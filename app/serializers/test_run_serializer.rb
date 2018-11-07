class TestRunSerializer < TestRunCollectionSerializer
  attribute :test_cases_count do
    object.test_cases.count
  end
end
