class AddTransactionReferencesToDocument < ActiveRecord::Migration[6.1]
  def change
    add_reference :documents, :transaction, foreign_key: true, null: true
  end
end
