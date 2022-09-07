class AddClientCommentToNewaccounts < ActiveRecord::Migration[6.1]
  def change
    add_column :newaccounts, :client_comment, :text
  end
end
