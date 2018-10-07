class CreateTestSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :test_steps do |t|
      t.column :hash_id, "varchar(64) character set latin1", null: false
      t.references :test_case, foreign_key: true, null: false
      t.string :name
      t.column :status, "varchar(16) character set latin1"
      t.json :properties
      t.timestamps
      t.datetime :finished_at

      t.index [:test_case_id, :hash_id], unique: true
    end
  end
end
