class AddAdminToAdminBranches < ActiveRecord::Migration[5.2]
  def change
    add_reference :admin_branches, :admin, foreign_key: true
  end
end
