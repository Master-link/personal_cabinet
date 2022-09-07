class DeleteCodeFromCountries < ActiveRecord::Migration[6.1]
  def change
    remove_column :countries, :code, :string
  end
end
