class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.column :uuid, "varchar(36) character set latin1", null: false, index: true
      t.string :name, null: false

      t.timestamps
    end
  end
end
