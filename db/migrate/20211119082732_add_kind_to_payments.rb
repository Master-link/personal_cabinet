class AddKindToPayments < ActiveRecord::Migration[6.1]
  def change
    add_column :payments, :kind, :string
    add_column :payments, :jsondata, :jsonb, default: {}
  end
end
