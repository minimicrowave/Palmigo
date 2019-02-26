class CreateStaffDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :staff_details do |t|
      t.string :name
      t.integer :contact
      t.string :job_title
      t.string :employment_type

      t.timestamps
    end
  end
end
