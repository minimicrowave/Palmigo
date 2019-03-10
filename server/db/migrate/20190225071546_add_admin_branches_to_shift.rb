class AddAdminBranchesToShift < ActiveRecord::Migration[5.2]
  def change
    add_reference :shifts, :admin_branch, foreign_key: true
  end
end
