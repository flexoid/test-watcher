class CreateTestCases < ActiveRecord::Migration[5.2]
  def change
    create_table :test_cases do |t|
      t.column :test_case_hash, "varchar(32) character set latin1", null: false
      t.string :name
      t.references :test_run, foreign_key: true
      t.column :status, "varchar(16) character set latin1"
      t.float :duration
      t.json :properties

      t.timestamps

      t.index [:test_run_id, :test_case_hash], unique: true
    end
  end
end
