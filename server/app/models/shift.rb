class Shift < ApplicationRecord
    belongs_to :admin_branch
    has_one :admin, through: :admin_branch
    has_and_belongs_to_many :staff_details
end
