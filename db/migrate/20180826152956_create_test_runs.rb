class CreateTestRuns < ActiveRecord::Migration[5.2]
  def change
    create_table :test_runs do |t|
      t.string :name

      t.timestamps
    end
  end
end
