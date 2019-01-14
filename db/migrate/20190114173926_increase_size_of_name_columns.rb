class IncreaseSizeOfNameColumns < ActiveRecord::Migration[5.2]
  def up
    change_column :features, :name, :text
    change_column :test_cases, :name, :text
    change_column :test_steps, :name, :text
  end

  def down
    change_column :features, :name, :string
    change_column :test_cases, :name, :string
    change_column :test_steps, :name, :string
  end
end
