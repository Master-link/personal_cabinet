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

ActiveRecord::Schema.define(version: 2022_05_31_092947) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.bigint "subscription_id"
    t.string "name"
    t.integer "spend_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["subscription_id"], name: "index_accounts_on_subscription_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "alert_settings", force: :cascade do |t|
    t.string "name"
    t.bigint "client_id"
    t.boolean "email_enabled", default: false
    t.boolean "sms_enabled", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "alert_type"
    t.datetime "first_send_at"
    t.datetime "last_send_at"
    t.string "state", default: "disabled"
    t.jsonb "setting", default: {}
    t.index ["client_id", "alert_type"], name: "index_alert_settings_on_client_id_and_alert_type", unique: true
    t.index ["client_id"], name: "index_alert_settings_on_client_id"
  end

  create_table "analitic_loggers", force: :cascade do |t|
    t.string "name"
    t.jsonb "log", default: {}
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "audits", force: :cascade do |t|
    t.integer "auditable_id"
    t.string "auditable_type"
    t.integer "associated_id"
    t.string "associated_type"
    t.integer "user_id"
    t.string "user_type"
    t.string "username"
    t.string "action"
    t.jsonb "audited_changes"
    t.integer "version", default: 0
    t.string "comment"
    t.string "remote_address"
    t.string "request_uuid"
    t.datetime "created_at"
    t.index ["associated_type", "associated_id"], name: "associated_index"
    t.index ["auditable_type", "auditable_id", "version"], name: "auditable_index"
    t.index ["created_at"], name: "index_audits_on_created_at"
    t.index ["request_uuid"], name: "index_audits_on_request_uuid"
    t.index ["user_id", "user_type"], name: "user_index"
  end

  create_table "callbot_consumptions", force: :cascade do |t|
    t.integer "count", default: 0
    t.decimal "summ", default: "0.0"
    t.date "period"
    t.bigint "client_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_callbot_consumptions_on_client_id"
    t.index ["period"], name: "index_callbot_consumptions_on_period"
  end

  create_table "cb_dailystats", force: :cascade do |t|
    t.date "period"
    t.integer "count", default: 0
    t.integer "old_count", default: 0
    t.decimal "price", default: "0.0"
    t.integer "client_id"
    t.integer "sms_consumption_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_cb_dailystats_on_client_id"
    t.index ["period"], name: "index_cb_dailystats_on_period"
    t.index ["sms_consumption_id"], name: "index_cb_dailystats_on_sms_consumption_id"
  end

  create_table "claims", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "service_id"
    t.bigint "tariff_id"
    t.datetime "date_activation"
    t.text "comment"
    t.text "state", default: "state_new"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_claims_on_client_id"
    t.index ["service_id"], name: "index_claims_on_service_id"
    t.index ["tariff_id"], name: "index_claims_on_tariff_id"
  end

  create_table "client_requisites", force: :cascade do |t|
    t.bigint "client_id"
    t.string "company_type"
    t.string "inn"
    t.string "kpp"
    t.string "full_name"
    t.string "head_chief"
    t.string "act_because_of"
    t.string "head_chief_signature"
    t.string "address"
    t.string "bank_checking_account"
    t.string "bank_cash_account"
    t.string "bank_name"
    t.string "bank_bik"
    t.string "phone"
    t.string "passport_series"
    t.string "passport_number"
    t.string "passport_issued"
    t.string "passport_issued_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_client_requisites_on_client_id"
  end

  create_table "clients", force: :cascade do |t|
    t.bigint "country_id"
    t.integer "crm_id"
    t.string "name"
    t.string "email"
    t.text "organization"
    t.integer "platform_client_id"
    t.json "settings", default: {"alert_emails"=>"", "alert_phone"=>"", "utc_offset"=>nil, "one_c_id"=>""}
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "employee_id"
    t.index ["country_id"], name: "index_clients_on_country_id"
    t.index ["deleted_at"], name: "index_clients_on_deleted_at"
    t.index ["employee_id"], name: "index_clients_on_employee_id"
  end

  create_table "clients_reads", force: :cascade do |t|
    t.jsonb "clients", default: {"read"=>[]}
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.string "phone_code"
    t.datetime "deleted_at"
    t.bigint "currency_id"
    t.index ["currency_id"], name: "index_countries_on_currency_id"
    t.index ["deleted_at"], name: "index_countries_on_deleted_at"
  end

  create_table "crms", force: :cascade do |t|
    t.string "crm", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["crm"], name: "index_crms_on_crm", unique: true
  end

  create_table "crms_users", id: false, force: :cascade do |t|
    t.bigint "crm_id"
    t.bigint "user_id"
    t.index ["crm_id", "user_id"], name: "index_crms_users_on_crm_id_and_user_id", unique: true
    t.index ["crm_id"], name: "index_crms_users_on_crm_id"
    t.index ["user_id"], name: "index_crms_users_on_user_id"
  end

  create_table "currencies", force: :cascade do |t|
    t.string "name"
    t.string "symbol"
    t.string "iso4217_code"
    t.integer "iso4217_num"
    t.string "unicode_code"
    t.string "decimal_code"
    t.string "hexadecimal_code"
    t.string "fmt"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "dailystats", force: :cascade do |t|
    t.date "period"
    t.string "login"
    t.string "operator"
    t.string "sms_type"
    t.string "status"
    t.integer "clientsms"
    t.integer "client_id"
    t.integer "route_id"
    t.integer "count"
    t.integer "old_count"
    t.decimal "price", precision: 6, scale: 2, default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "documents", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "tariff_id"
    t.integer "document_type", default: 0
    t.decimal "price", precision: 15, scale: 2, default: "0.0"
    t.datetime "creation_datetime"
    t.string "file_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "transaction_id"
    t.index ["client_id"], name: "index_documents_on_client_id"
    t.index ["tariff_id"], name: "index_documents_on_tariff_id"
    t.index ["transaction_id"], name: "index_documents_on_transaction_id"
  end

  create_table "employees", force: :cascade do |t|
    t.integer "crm"
    t.string "name"
    t.integer "category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "employees_users", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "employee_id"
    t.index ["employee_id"], name: "index_employees_users_on_employee_id"
    t.index ["user_id"], name: "index_employees_users_on_user_id"
  end

  create_table "geographies", force: :cascade do |t|
    t.bigint "service_id"
    t.bigint "country_id"
    t.index ["country_id"], name: "index_geographies_on_country_id"
    t.index ["service_id", "country_id"], name: "index_geographies_on_service_id_and_country_id"
    t.index ["service_id"], name: "index_geographies_on_service_id"
  end

  create_table "legal_entities", force: :cascade do |t|
    t.string "name", default: ""
    t.string "inn", default: ""
    t.string "kpp", default: ""
    t.string "address", default: ""
    t.string "checking_account", default: ""
    t.string "bank_name", default: ""
    t.string "bik", default: ""
    t.string "account", default: ""
    t.string "director_name", default: ""
    t.string "director_name_sign", default: ""
    t.string "bank_account", default: ""
    t.string "phone", default: ""
    t.string "accountant", default: ""
    t.string "stamp_url", default: ""
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "license_modules", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "newaccounts", force: :cascade do |t|
    t.string "crm"
    t.text "name"
    t.integer "spend_time"
    t.integer "final_spend_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "client_comment"
    t.integer "appeal_id"
  end

  create_table "news", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.datetime "published_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "clients_read_id"
    t.index ["clients_read_id"], name: "index_news_on_clients_read_id"
  end

  create_table "nomenclatures", force: :cascade do |t|
    t.string "code"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["code"], name: "index_nomenclatures_on_code", unique: true
  end

  create_table "nomenclatures_tariffs", force: :cascade do |t|
    t.bigint "tariff_id"
    t.bigint "nomenclature_id"
    t.index ["nomenclature_id"], name: "index_nomenclatures_tariffs_on_nomenclature_id"
    t.index ["tariff_id"], name: "index_nomenclatures_tariffs_on_tariff_id", unique: true
  end

  create_table "ntf_categories", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "ntf_messages", force: :cascade do |t|
    t.bigint "category_id"
    t.jsonb "spread", default: {"users"=>[]}
    t.jsonb "read", default: {"users"=>[]}
    t.string "message"
    t.string "link"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_ntf_messages_on_category_id"
  end

  create_table "operators", force: :cascade do |t|
    t.string "name"
    t.string "title"
    t.integer "kind"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "opsms", force: :cascade do |t|
    t.bigint "operator_id"
    t.integer "limit", default: 0
    t.decimal "price", precision: 6, scale: 2, default: "0.0"
    t.string "smsable_type"
    t.bigint "smsable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["operator_id"], name: "index_opsms_on_operator_id"
    t.index ["smsable_type", "smsable_id"], name: "index_opsms_on_smsable"
  end

  create_table "payments", force: :cascade do |t|
    t.decimal "amount", precision: 15, scale: 2
    t.bigint "client_id"
    t.bigint "service_id"
    t.string "status"
    t.string "payments_statuses"
    t.string "provider_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "kind"
    t.jsonb "jsondata", default: {}
    t.index ["client_id"], name: "index_payments_on_client_id"
    t.index ["service_id"], name: "index_payments_on_service_id"
  end

  create_table "qa_answers", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "question_id"
    t.bigint "parent_answer_id"
    t.integer "rating_sum", default: 0
    t.text "value", null: false
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["parent_answer_id"], name: "index_qa_answers_on_parent_answer_id"
    t.index ["question_id"], name: "index_qa_answers_on_question_id"
    t.index ["user_id"], name: "index_qa_answers_on_user_id"
  end

  create_table "qa_categories", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "sort", default: 0
    t.jsonb "jsondata", default: {}
  end

  create_table "qa_questions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "category_id"
    t.integer "rating_sum", default: 0
    t.text "value", null: false
    t.string "status"
    t.datetime "published_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "title"
    t.index ["category_id"], name: "index_qa_questions_on_category_id"
    t.index ["user_id"], name: "index_qa_questions_on_user_id"
  end

  create_table "qa_ratings", force: :cascade do |t|
    t.bigint "user_id"
    t.string "ratingable_type"
    t.bigint "ratingable_id"
    t.integer "value", limit: 2, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ratingable_type", "ratingable_id"], name: "index_qa_ratings_on_ratingable"
    t.index ["user_id"], name: "index_qa_ratings_on_user_id"
  end

  create_table "queuelogs", force: :cascade do |t|
    t.bigint "user_id"
    t.string "state"
    t.string "name"
    t.jsonb "result"
    t.datetime "started_at"
    t.datetime "finished_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_queuelogs_on_user_id"
  end

  create_table "resolutions", force: :cascade do |t|
    t.string "name"
    t.string "version", default: "V1"
    t.string "c_class"
    t.string "c_action"
    t.text "condition"
    t.text "comment"
    t.boolean "enabled", default: true
    t.jsonb "json_data", default: {"roles"=>[]}
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "resolutions_roles", id: false, force: :cascade do |t|
    t.bigint "role_id"
    t.bigint "resolution_id"
    t.index ["resolution_id"], name: "index_resolutions_roles_on_resolution_id"
    t.index ["role_id", "resolution_id"], name: "index_resolutions_roles_on_role_id_and_resolution_id", unique: true
    t.index ["role_id"], name: "index_resolutions_roles_on_role_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["name"], name: "index_roles_on_name"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource"
  end

  create_table "sentsms", force: :cascade do |t|
    t.bigint "sms_consumption_id"
    t.integer "extid"
    t.string "login"
    t.string "status"
    t.string "operator"
    t.string "uid"
    t.string "phone_number"
    t.string "message"
    t.datetime "status_changed_at"
    t.integer "routeid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["sms_consumption_id"], name: "index_sentsms_on_sms_consumption_id"
  end

  create_table "service_balances", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "service_id"
    t.decimal "balance", precision: 15, scale: 2, default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id", "service_id"], name: "index_service_balances_on_client_id_and_service_id", unique: true
    t.index ["client_id"], name: "index_service_balances_on_client_id"
    t.index ["service_id"], name: "index_service_balances_on_service_id"
  end

  create_table "services", force: :cascade do |t|
    t.bigint "currency_id"
    t.bigint "legal_entity_id"
    t.string "name"
    t.string "state"
    t.string "alert_template_email"
    t.string "alert_template_sms"
    t.integer "notify_expires_days"
    t.json "ticket", default: {}
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "tariffs_count", default: 0
    t.text "agreement"
    t.index ["currency_id"], name: "index_services_on_currency_id"
    t.index ["legal_entity_id"], name: "index_services_on_legal_entity_id"
  end

  create_table "sms_consumptions", force: :cascade do |t|
    t.integer "sentsmses_count", default: 0
    t.decimal "summ", precision: 15, scale: 2, default: "0.0"
    t.date "period"
    t.bigint "client_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_sms_consumptions_on_client_id"
    t.index ["period"], name: "index_sms_consumptions_on_period"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "tariff_id"
    t.string "state"
    t.integer "credit_limit"
    t.json "jsondata", default: {"renewal"=>false, "custom_payment"=>0, "paid_on"=>nil}
    t.json "settings", default: {}
    t.datetime "started_at"
    t.datetime "ended_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_subscriptions_on_client_id"
    t.index ["tariff_id"], name: "index_subscriptions_on_tariff_id"
  end

  create_table "tariffs", force: :cascade do |t|
    t.bigint "service_id"
    t.string "name"
    t.datetime "started_at"
    t.datetime "ended_at"
    t.string "kind"
    t.string "duration_kind"
    t.decimal "advance_payment", precision: 15, scale: 2
    t.json "settings", default: {}
    t.json "extra", default: {"allow_client_subscription"=>false, "allow_with_confirmation"=>false, "changeable"=>false}
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["deleted_at"], name: "index_tariffs_on_deleted_at"
    t.index ["service_id"], name: "index_tariffs_on_service_id"
  end

  create_table "taxophones", force: :cascade do |t|
    t.bigint "client_id"
    t.string "vtm"
    t.json "geo_objects"
    t.json "crew_groups"
    t.json "tf_tm_options"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_taxophones_on_client_id"
  end

  create_table "tmstats", force: :cascade do |t|
    t.bigint "crm_id"
    t.integer "time"
    t.integer "before_count"
    t.integer "after_count"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "newaccount_id"
    t.string "kind"
    t.bigint "user_id"
    t.index ["crm_id"], name: "index_tmstats_on_crm_id"
    t.index ["newaccount_id"], name: "index_tmstats_on_newaccount_id"
    t.index ["user_id"], name: "index_tmstats_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "client_id"
    t.bigint "subscription_id"
    t.bigint "service_id"
    t.bigint "user_id"
    t.string "one_c_id"
    t.decimal "money", precision: 15, scale: 2, null: false
    t.integer "source", null: false
    t.json "detail"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["client_id"], name: "index_transactions_on_client_id"
    t.index ["service_id"], name: "index_transactions_on_service_id"
    t.index ["subscription_id"], name: "index_transactions_on_subscription_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "login"
    t.string "email"
    t.string "password_digest"
    t.string "phone_number"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.integer "sign_in_count", default: 0
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["login"], name: "index_users_on_login", unique: true
    t.index ["phone_number"], name: "index_users_on_phone_number", unique: true
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "role_id"
    t.index ["role_id"], name: "index_users_roles_on_role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id"
    t.index ["user_id"], name: "index_users_roles_on_user_id"
  end

  create_table "users_signins", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "token"
    t.index ["user_id"], name: "index_users_signins_on_user_id"
  end

  add_foreign_key "accounts", "subscriptions"
  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "alert_settings", "clients"
  add_foreign_key "callbot_consumptions", "clients"
  add_foreign_key "claims", "clients"
  add_foreign_key "claims", "services"
  add_foreign_key "claims", "tariffs"
  add_foreign_key "client_requisites", "clients"
  add_foreign_key "clients", "countries"
  add_foreign_key "clients", "employees"
  add_foreign_key "countries", "currencies"
  add_foreign_key "crms_users", "crms"
  add_foreign_key "crms_users", "users"
  add_foreign_key "documents", "clients"
  add_foreign_key "documents", "tariffs"
  add_foreign_key "documents", "transactions"
  add_foreign_key "employees_users", "employees"
  add_foreign_key "employees_users", "users"
  add_foreign_key "geographies", "countries"
  add_foreign_key "geographies", "services"
  add_foreign_key "news", "clients_reads"
  add_foreign_key "nomenclatures_tariffs", "nomenclatures"
  add_foreign_key "nomenclatures_tariffs", "tariffs"
  add_foreign_key "ntf_messages", "ntf_categories", column: "category_id"
  add_foreign_key "payments", "clients"
  add_foreign_key "payments", "services"
  add_foreign_key "qa_answers", "qa_answers", column: "parent_answer_id"
  add_foreign_key "qa_answers", "qa_questions", column: "question_id"
  add_foreign_key "qa_answers", "users"
  add_foreign_key "qa_questions", "qa_categories", column: "category_id"
  add_foreign_key "qa_questions", "users"
  add_foreign_key "qa_ratings", "users"
  add_foreign_key "queuelogs", "users"
  add_foreign_key "resolutions_roles", "resolutions"
  add_foreign_key "resolutions_roles", "roles"
  add_foreign_key "sentsms", "sms_consumptions"
  add_foreign_key "service_balances", "clients"
  add_foreign_key "service_balances", "services"
  add_foreign_key "services", "currencies"
  add_foreign_key "services", "legal_entities"
  add_foreign_key "sms_consumptions", "clients"
  add_foreign_key "subscriptions", "clients"
  add_foreign_key "subscriptions", "tariffs"
  add_foreign_key "tariffs", "services"
  add_foreign_key "taxophones", "clients"
  add_foreign_key "tmstats", "crms"
  add_foreign_key "tmstats", "newaccounts"
  add_foreign_key "tmstats", "users"
  add_foreign_key "transactions", "clients"
  add_foreign_key "transactions", "services"
  add_foreign_key "transactions", "subscriptions"
  add_foreign_key "transactions", "users"
  add_foreign_key "users_signins", "users"
end
