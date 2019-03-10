class ShiftsController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_shift, only: [:show, :edit, :update, :destroy]

  # GET /shifts
  # GET /shifts.json
  def index
    # @admin_branches = AdminBranch.where(admin_id: current_admin.id);
    # @shifts - Shift.where(@admin_branches)
    # @shift = Shift.@admin_branches
    @admin_branches = AdminBranch.where(admin_id: current_admin.id)
    p @admin_branches
    p @admin_branches.ids
    @shifts = Shift.where(admin_branch_id: @admin_branches.ids)
    render json: @shifts
  end

  # GET /shifts/1
  # GET /shifts/1.json
  def show
    if @shifts.admin.id != current_admin.id
      redirect_to shifts_path
    end
  end

  # GET /shifts/new
  def new
    @shift = Shift.new
  end
  
  # GET /shifts/1/edit
  def edit
    @shifts.admin_id != current_admin.id
  end
  
  # POST /shifts
  # POST /shifts.json
  def create
    @shift = Shift.new(shift_params)
    
    # respond_to do |format|
      if @shift.save
        render json: {success: true}
        # format.html { redirect_to @shift, notice: 'Shift was successfully created.' }
        # format.json { render :show, status: :created, location: @shift }
      else
        p @shift.errors.inspect
        # format.html { render :new }
        # format.json { render json: @shift.errors, status: :unprocessable_entity }
      end
    # end
  end

  # PATCH/PUT /shifts/1
  # PATCH/PUT /shifts/1.json
  def update
    respond_to do |format|
      if @shift.update(shift_params)
        format.html { redirect_to @shift, notice: 'Shift was successfully updated.' }
        format.json { render :show, status: :ok, location: @shift }
      else
        format.html { render :edit }
        format.json { render json: @shift.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /shifts/1
  # DELETE /shifts/1.json
  def destroy
    @shift.destroy
    respond_to do |format|
      format.html { redirect_to shifts_url, notice: 'Shift was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shift
      @shift = Shift.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def shift_params
      params.require(:shift).permit(:date, :time, :min_staff, :admin_branch_id)
    end
end
