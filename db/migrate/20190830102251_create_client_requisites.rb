class CreateClientRequisites < ActiveRecord::Migration[6.1]
  def change
    create_table :client_requisites do |t|
      t.references :client, foreign_key: true
      t.string :company_type
      t.string :inn
      t.string :kpp
      t.string :full_name
      t.string :head_chief
      t.string :act_because_of
      t.string :head_chief_signature
      t.string :address
      t.string :bank_checking_account
      t.string :bank_cash_account
      t.string :bank_name
      t.string :bank_bik
      t.string :phone
      t.string :passport_series
      t.string :passport_number
      t.string :passport_issued
      t.string :passport_issued_date

      t.timestamps
    end
  end
end
