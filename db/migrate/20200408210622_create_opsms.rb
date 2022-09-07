class CreateOpsms < ActiveRecord::Migration[6.1]
  def change
    create_table :opsms do |t|
      t.references :operator
      t.integer :limit, default: 0
      t.decimal :price, precision: 6, scale: 2, default: 0
      t.references :smsable, polymorphic: true

      t.timestamps
    end
  end
end
