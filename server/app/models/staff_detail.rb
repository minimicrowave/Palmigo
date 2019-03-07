class StaffDetail < ApplicationRecord
    belongs_to :staff
    has_one :admin_branches
    has_one :admin, through: :admin_branches
end
