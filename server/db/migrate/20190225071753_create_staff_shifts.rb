class CreateStaffShifts < ActiveRecord::Migration[5.2]
  def change
    create_table :staff_shifts do |t|
      t.references :shift, foreign_key: true
      t.references :staff_details, foreign_key: true
      t.boolean :absence
      t.boolean :branch_match

      t.timestamps
    end
  end
end
