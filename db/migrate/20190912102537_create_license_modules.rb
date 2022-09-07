class CreateLicenseModules < ActiveRecord::Migration[6.1]
  def change
    create_table :license_modules do |t|
      t.string :name

      t.timestamps
    end
  end
end
