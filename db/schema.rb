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

ActiveRecord::Schema.define(version: 2018_10_03_213553) do

  create_table "features", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "hash_id", limit: 64, null: false, collation: "latin1_swedish_ci"
    t.bigint "test_run_id", null: false
    t.string "name"
    t.index ["hash_id"], name: "index_features_on_hash_id"
    t.index ["test_run_id", "hash_id"], name: "index_features_on_test_run_id_and_hash_id", unique: true
    t.index ["test_run_id"], name: "index_features_on_test_run_id"
  end

  create_table "projects", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "uuid", limit: 36, null: false, collation: "latin1_swedish_ci"
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uuid"], name: "index_projects_on_uuid"
  end

  create_table "test_cases", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "hash_id", limit: 64, null: false, collation: "latin1_swedish_ci"
    t.bigint "feature_id", null: false
    t.string "name"
    t.string "status", limit: 16, collation: "latin1_swedish_ci"
    t.json "properties"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "finished_at"
    t.index ["feature_id", "hash_id"], name: "index_test_cases_on_feature_id_and_hash_id", unique: true
    t.index ["feature_id"], name: "index_test_cases_on_feature_id"
  end

  create_table "test_runs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "uuid", limit: 36, null: false, collation: "latin1_swedish_ci"
    t.bigint "project_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "finished_at"
    t.index ["project_id"], name: "index_test_runs_on_project_id"
    t.index ["uuid"], name: "index_test_runs_on_uuid", unique: true
  end

  create_table "test_steps", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "hash_id", limit: 64, null: false, collation: "latin1_swedish_ci"
    t.bigint "test_case_id", null: false
    t.string "name"
    t.string "status", limit: 16, collation: "latin1_swedish_ci"
    t.json "properties"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "finished_at"
    t.index ["test_case_id", "hash_id"], name: "index_test_steps_on_test_case_id_and_hash_id", unique: true
    t.index ["test_case_id"], name: "index_test_steps_on_test_case_id"
  end

  add_foreign_key "features", "test_runs"
  add_foreign_key "test_cases", "features"
  add_foreign_key "test_runs", "projects"
  add_foreign_key "test_steps", "test_cases"
end
