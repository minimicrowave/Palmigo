# frozen_string_literal: true

class Staffs::SessionsController < Devise::SessionsController
  include Accessible
  skip_before_action :check_user, only: :destroy

  respond_to :json
  private

  def respond_with(resource, _opts = {})
    p resource
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
  
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
