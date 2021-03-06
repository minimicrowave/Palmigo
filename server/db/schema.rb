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

ActiveRecord::Schema.define(version: 2019_02_25_072804) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admin_branches", force: :cascade do |t|
    t.string "name"
    t.integer "contact"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "admin_id"
    t.index ["admin_id"], name: "index_admin_branches_on_admin_id"
  end

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "shifts", force: :cascade do |t|
    t.date "date"
    t.string "time"
    t.integer "min_staff"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "admin_branch_id"
    t.index ["admin_branch_id"], name: "index_shifts_on_admin_branch_id"
  end

  create_table "staff_details", force: :cascade do |t|
    t.string "name"
    t.integer "contact"
    t.string "job_title"
    t.string "employment_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "staff_id"
    t.bigint "admin_branch_id"
    t.index ["admin_branch_id"], name: "index_staff_details_on_admin_branch_id"
    t.index ["staff_id"], name: "index_staff_details_on_staff_id"
  end

  create_table "staff_shifts", force: :cascade do |t|
    t.bigint "shift_id"
    t.bigint "staff_details_id"
    t.boolean "absence"
    t.boolean "branch_match"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shift_id"], name: "index_staff_shifts_on_shift_id"
    t.index ["staff_details_id"], name: "index_staff_shifts_on_staff_details_id"
  end

  create_table "staffs", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_staffs_on_email", unique: true
    t.index ["reset_password_token"], name: "index_staffs_on_reset_password_token", unique: true
  end

  add_foreign_key "admin_branches", "admins"
  add_foreign_key "shifts", "admin_branches"
  add_foreign_key "staff_details", "admin_branches"
  add_foreign_key "staff_details", "staffs"
  add_foreign_key "staff_shifts", "shifts"
  add_foreign_key "staff_shifts", "staff_details", column: "staff_details_id"
end
