class CreateTestCases < ActiveRecord::Migration[5.2]
  def change
    create_table :test_cases do |t|
      t.string :name
      t.references :test_run, foreign_key: true
      t.column :status, "varchar(16) character set latin1"
      t.float :duration
      t.json :properties

      t.timestamps
    end
  end
end
