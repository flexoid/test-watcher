class CreateTestRuns < ActiveRecord::Migration[5.2]
  def change
    create_table :test_runs do |t|
      t.column :uuid, "char(36) character set latin1", null: false
      t.string :name

      t.timestamps
      t.index :uuid, unique: true
    end
  end
end
