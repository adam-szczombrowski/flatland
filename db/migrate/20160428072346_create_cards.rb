class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :name
      t.integer :year
      t.string :image

      t.timestamps null: false
    end
  end
end
