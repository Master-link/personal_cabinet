# frozen_string_literal: true

class CreateNtfMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :ntf_messages do |t|
      t.references :category, foreign_key: { to_table: :ntf_categories }
      t.jsonb :spread, default: { users: [] } # кому адресуются сообщения, users: [] - всем, [user_id, ....] - поюзерно
      t.jsonb :read, default: { users: [] } # кто прочитал сообщение
      t.string :message
      t.string :link # ссылка для перехода при клике на месседж
      t.timestamps
    end
  end
end
