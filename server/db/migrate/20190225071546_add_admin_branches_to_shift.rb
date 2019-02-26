class AddAdminBranchesToShift < ActiveRecord::Migration[5.2]
  def change
    add_reference :shifts, :admin_branches, foreign_key: true
  end
end
