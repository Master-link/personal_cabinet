class AddAppealIdToNewAccount < ActiveRecord::Migration[6.1]
  def change
    add_column :newaccounts, :appeal_id, :integer
  end
end
