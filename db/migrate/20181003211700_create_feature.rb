class CreateFeature < ActiveRecord::Migration[5.2]
  def change
    create_table :features do |t|
      t.column :hash_id, "varchar(64) character set latin1", null: false, index: true
      t.references :test_run, foreign_key: true, null: false
      t.string :name

      t.index [:test_run_id, :hash_id], unique: true
    end
  end
end
