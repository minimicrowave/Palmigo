class AdminBranchesController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_admin_branch, only: [:show, :edit, :update, :destroy]

  def validate
    render json: {name: current_admin.name }
  end

  # GET /admin_branches.json
  def index
    @admin_branches = AdminBranch.where(admin_id: current_admin.id)
    render json: @admin_branches
  end

  # GET /admin_branches/1.json
  def show
    if @admin_branch.admin_id != current_admin.id
      redirect_to admin_branches_path
    end
    render json: @admin_branch
  end

  # GET /admin_branches/new
  def new
    @admin_branch = AdminBranch.new
  end

  # GET /admin_branches/1/edit
  def edit
    if @admin_branch.admin_id != current_admin.id
      redirect_to admin_branches_path
    end
  end

  # POST /admin_branches.json
  def create
    @admin_branch = AdminBranch.new(admin_branch_params)
    @admin_branch.admin_id = current_admin.id

    p @admin_branch
    respond_to do |format|
      if @admin_branch.save
        format.html { redirect_to @admin_branch, notice: 'Admin branch was successfully created.' }
      else
        format.html { render :new }
        format.json { render json: @admin_branch.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin_branches/1
  # PATCH/PUT /admin_branches/1.json
  def update
      if @admin_branch.update(admin_branch_params)
        render json: {success: true}
      end
  end

  # DELETE /admin_branches/1
  # DELETE /admin_branches/1.json
  def destroy
    @admin_branch.destroy
    render json: {success: true}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_branch
      @admin_branch = AdminBranch.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_branch_params
      params.require(:admin_branch).permit(:name, :contact, :location)
    end
end
