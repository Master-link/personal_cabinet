class ChangeResultToJsonb < ActiveRecord::Migration[6.1]
    def up
      execute <<-SQL
      UPDATE queuelogs SET result = '{}'
      SQL
      change_column :queuelogs, :result, :jsonb, using: 'result::text::jsonb'
    end

    def down
      execute <<-SQL
      UPDATE queuelogs SET result = '{}'
      SQL
      change_column :queuelogs, :result, :text, using: 'result::jsonb::text'
    end
end
