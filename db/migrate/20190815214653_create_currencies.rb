class CreateCurrencies < ActiveRecord::Migration[6.1]
  def change
    create_table :currencies do |t|
      t.string :name
      t.string :symbol
      t.string :iso4217_code
      t.integer :iso4217_num
      t.string :unicode_code
      t.string :decimal_code
      t.string :hexadecimal_code
      t.string :fmt

      t.timestamps
    end
  end
end