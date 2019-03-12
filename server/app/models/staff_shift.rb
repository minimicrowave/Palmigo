class StaffShift < ApplicationRecord
  belongs_to :shift
  belongs_to :staff_detail
end
