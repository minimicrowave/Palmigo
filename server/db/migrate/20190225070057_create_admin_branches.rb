class CreateAdminBranches < ActiveRecord::Migration[5.2]
  def change
    create_table :admin_branches do |t|
      t.string :name
      t.integer :contact
      t.string :location

      t.timestamps
    end
  end
end
