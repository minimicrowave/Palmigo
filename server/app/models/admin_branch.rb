class AdminBranch < ApplicationRecord
    belongs_to :admin
    has_many :staff_details
    has_many :shifts
end
