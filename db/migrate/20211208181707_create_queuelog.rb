class CreateQueuelog < ActiveRecord::Migration[6.1]
  def change
    create_table :queuelogs do |t|
      t.references :user, foreign_key: true
      t.string :state
      t.string :name
      t.text :result
      t.datetime :started_at
      t.datetime :finished_at
      t.timestamps
    end
  end
end
