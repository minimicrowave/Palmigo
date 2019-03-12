class StaffShiftsController < ApplicationController
    before_action :authenticate_admin!
    def staffShiftCreate
        @staff_shift = StaffShift.new
    end
  
    def staffShiftPost
        @staff_shift = StaffShift.new(staff_shift_params)
        if @staff_shift.save
            render json: {success: true}
         end
    end

    private
    def staff_shift_params
        params.require(:staff_shift).permit(:staff_detail_id, :shift_id)
    end
end
