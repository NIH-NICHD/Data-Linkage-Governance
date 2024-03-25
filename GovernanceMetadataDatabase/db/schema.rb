# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_02_06_163935) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "constraints", force: :cascade do |t|
    t.string "operator"
    t.string "left_operand"
    t.string "right_operand"
    t.bigint "rule_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rule_id"], name: "index_constraints_on_rule_id"
  end

  create_table "data_lifecycles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "datasets", force: :cascade do |t|
    t.string "name"
    t.string "source"
    t.string "source_agency"
    t.string "dataset_type"
    t.jsonb "information_sources", default: []
    t.jsonb "pii_elements", default: []
    t.string "pii_elements_holder"
    t.string "common_data_model"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "functions", force: :cascade do |t|
    t.string "type"
    t.bigint "rule_id"
    t.bigint "party_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["party_id"], name: "index_functions_on_party_id"
    t.index ["rule_id"], name: "index_functions_on_rule_id"
  end

  create_table "parties", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "policies", force: :cascade do |t|
    t.string "type"
    t.string "name"
    t.bigint "dataset_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dataset_id"], name: "index_policies_on_dataset_id"
  end

  create_table "policy_commentaries", force: :cascade do |t|
    t.bigint "rule_id"
    t.bigint "data_lifecycle_id"
    t.text "language"
    t.text "interpretation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["data_lifecycle_id"], name: "index_policy_commentaries_on_data_lifecycle_id"
    t.index ["rule_id"], name: "index_policy_commentaries_on_rule_id"
  end

  create_table "prior_linkages", force: :cascade do |t|
    t.string "dataset_name"
    t.string "dataset_type"
    t.string "dataset_source"
    t.string "methodology"
    t.jsonb "pii_elements", default: []
    t.string "entity_resolver"
    t.string "performing_party"
    t.text "quality_assessment"
    t.text "data_sharing_method"
    t.bigint "dataset_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dataset_id"], name: "index_prior_linkages_on_dataset_id"
  end

  create_table "requirements", force: :cascade do |t|
    t.bigint "requiring_policy_id"
    t.bigint "required_policy_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["required_policy_id"], name: "index_requirements_on_required_policy_id"
    t.index ["requiring_policy_id"], name: "index_requirements_on_requiring_policy_id"
  end

  create_table "rules", force: :cascade do |t|
    t.string "type"
    t.string "action"
    t.bigint "policy_id"
    t.bigint "rule_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["policy_id"], name: "index_rules_on_policy_id"
    t.index ["rule_id"], name: "index_rules_on_rule_id"
  end

  create_table "sources", force: :cascade do |t|
    t.string "name"
    t.string "link"
    t.date "accessed_on"
    t.bigint "policy_commentary_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["policy_commentary_id"], name: "index_sources_on_policy_commentary_id"
  end

end
