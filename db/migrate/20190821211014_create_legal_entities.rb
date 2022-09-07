class CreateLegalEntities < ActiveRecord::Migration[6.1]
  def change
    create_table :legal_entities do |t|
      t.string :name, default: ''
      t.string :inn, default: ''
      t.string :kpp, default: ''
      t.string :address, default: ''
      t.string :checking_account, default: ''
      t.string :bank_name, default: ''
      t.string :bik, default: ''
      t.string :account, default: ''
      t.string :director_name, default: ''
      t.string :director_name_sign, default: ''
      t.string :bank_account, default: ''
      t.string :phone, default: ''
      t.string :accountant, default: ''
      t.string :stamp_url, default: ''

      t.timestamps
    end
  end
end
