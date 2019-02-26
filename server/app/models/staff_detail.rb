class StaffDetail < ApplicationRecord
    belongs_to :staff
    has_and_belongs_to_many :staff
    has_one :admin, through: :admin_branches
end
