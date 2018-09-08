# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_06_215044) do

  create_table "test_cases", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "test_case_hash", limit: 32, null: false, collation: "latin1_swedish_ci"
    t.string "name"
    t.bigint "test_run_id"
    t.string "status", limit: 16, collation: "latin1_swedish_ci"
    t.float "duration"
    t.json "properties"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["test_run_id", "test_case_hash"], name: "index_test_cases_on_test_run_id_and_test_case_hash", unique: true
    t.index ["test_run_id"], name: "index_test_cases_on_test_run_id"
  end

  create_table "test_runs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "uuid", limit: 36, null: false, collation: "latin1_swedish_ci"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uuid"], name: "index_test_runs_on_uuid", unique: true
  end

  create_table "test_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "test_step_hash", limit: 32, null: false, collation: "latin1_swedish_ci"
    t.string "name"
    t.bigint "test_case_id"
    t.string "status", limit: 16, collation: "latin1_swedish_ci"
    t.float "duration"
    t.json "properties"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["test_case_id", "test_step_hash"], name: "index_test_steps_on_test_case_id_and_test_step_hash", unique: true
    t.index ["test_case_id"], name: "index_test_steps_on_test_case_id"
  end

  add_foreign_key "test_cases", "test_runs"
  add_foreign_key "test_steps", "test_cases"
end
