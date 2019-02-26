class Shift < ApplicationRecord
    belongs_to :admin_branches
    has_one :admin, through: :admin_branches
    has_and_belongs_to_many :staff_details
end
