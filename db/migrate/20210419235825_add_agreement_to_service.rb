class AddAgreementToService < ActiveRecord::Migration[6.1]
  def change
    add_column :services, :agreement, :text
  end
end
