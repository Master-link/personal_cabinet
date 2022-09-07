class ChangeCrmFieldOnCrms < ActiveRecord::Migration[6.1]
  def up
    change_column :crms, :crm, :string
  end

  def down
    change_column :crms, :crm, :integer, using: 'CAST(crm AS integer)'
  end
end
