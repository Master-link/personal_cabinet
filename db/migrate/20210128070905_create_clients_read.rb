class CreateClientsRead < ActiveRecord::Migration[6.1]
  def change
    create_table :clients_reads do |t|
      t.jsonb :clients, default: {read: []}
    end
  end
end
