class AddStaffToStaffDetails < ActiveRecord::Migration[5.2]
  def change
    add_reference :staff_details, :staff, foreign_key: true
  end
end
