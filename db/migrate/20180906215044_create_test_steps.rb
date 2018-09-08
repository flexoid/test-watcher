class CreateTestSteps < ActiveRecord::Migration[5.2]
  def change
    create_table :test_steps do |t|
      t.column :test_step_hash, "varchar(32) character set latin1", null: false
      t.string :name
      t.references :test_case, foreign_key: true
      t.column :status, "varchar(16) character set latin1"
      t.float :duration
      t.json :properties

      t.timestamps

      t.index [:test_case_id, :test_step_hash], unique: true
    end
  end
end
