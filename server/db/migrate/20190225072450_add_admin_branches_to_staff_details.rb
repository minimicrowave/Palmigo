class AddAdminBranchesToStaffDetails < ActiveRecord::Migration[5.2]
  def change
    add_reference :staff_details, :admin_branches, foreign_key: true
  end
end
