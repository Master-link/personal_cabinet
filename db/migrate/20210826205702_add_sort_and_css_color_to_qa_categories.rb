class AddSortAndCssColorToQaCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :qa_categories, :sort,:integer, default: 0
    add_column :qa_categories, :jsondata, :jsonb, default: {}
  end
end
