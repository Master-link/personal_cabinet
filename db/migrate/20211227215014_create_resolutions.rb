class CreateResolutions < ActiveRecord::Migration[6.1]
  def change
    create_table :resolutions do |t|
      t.string :name
      t.string :version, default: "V1"
      t.string :c_class
      t.string :c_action
      t.text :condition
      t.text :comment
      t.boolean :enabled, default: true
      t.jsonb :json_data, default: { roles: [] } # полезно будет для выставления на фронте только заданным ролям

      t.timestamps
    end
  end
end
