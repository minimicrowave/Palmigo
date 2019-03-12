class StaffDetailsController < ApplicationController
  before_action :authenticate_staff!
  before_action :set_staff_detail, only: [:show, :edit, :update, :destroy]

  # GET /staff_details
  # GET /staff_details.json

  def validate
    render json: {name: current_staff.id}
  end
  
  def companyList
    @admins = Admin.all
    render json: @admins
  end

  def branchList
    @branches = AdminBranch.all
    render json: @branches
  end

  def index
    @staff_details = StaffDetail.where(staff_id: current_staff.id)
    render json: @staff_details
  end

  # GET /staff_details/1
  # GET /staff_details/1.json
  def show
    if @staff_details.staff_id != current_staff.id
      redirect_to staff_details_path
    end
  end

  # GET /staff_details/new
  def new
    @staff_detail = StaffDetail.new
  end

  # GET /staff_details/1/edit
  def edit
    if @staff_details.staff_id != current_staff.id
      redirect_to staff_details_path
    end
  end

  # POST /staff_details
  # POST /staff_details.json
  def create
    @staff_detail = StaffDetail.new(staff_detail_params)
    @staff_detail.staff_id = current_staff.id

    
    # respond_to do |format|
      if @staff_detail.save
        puts "SAVED"
        render json: @staff_detail
      else
        puts "DID NOT SAVE"
        p @staff_detail.errors
      end
    # end
  end

  # PATCH/PUT /staff_details/1
  # PATCH/PUT /staff_details/1.json
  def update
      if @staff_detail.update(staff_detail_params)
        render json: {success: true}
      end
  end

  # DELETE /staff_details/1
  # DELETE /staff_details/1.json
  def destroy
    @staff_detail.destroy
    respond_to do |format|
      format.html { redirect_to staff_details_url, notice: 'Staff detail was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def StaffShift
    @staff = StaffDetail.where(staff_id: current_staff.id).first
    @staffshift = StaffShift.where(staff_detail_id: @staff.id)
    render json: @staffshift
  end

  def shiftList
    @shifts = Shift.all
    render json: @shifts
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_staff_detail
      @staff_detail = StaffDetail.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def staff_detail_params
      params.require(:staff_detail).permit(:name, :contact, :job_title, :employment_type, :admin_branch_id)
    end
end
