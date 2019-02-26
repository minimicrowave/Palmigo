class CreateShifts < ActiveRecord::Migration[5.2]
  def change
    create_table :shifts do |t|
      t.date :date
      t.string :time
      t.integer :min_staff

      t.timestamps
    end
  end
end
