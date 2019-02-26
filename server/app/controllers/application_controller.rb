class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception 
    
    skip_before_action :verify_authenticity_token
    before_action :configure_permitted_parameters, if: :devise_controller?

    def staff_controller?
     !devise_controller? and request.path =~ /^\/staff/
   end
   helper_method :staff_controller?



    def render_resource(resource)
        if resource.errors.empty?
            render json: resource
            else
            validation_error(resource)
        end
    end
    
    def validation_error(resource)
        render json: {
              errors: [
            {
              status: '400',
              title: 'Bad Request',
              detail: resource.errors,
              code: '100'
            }
             ]
            }, status: :bad_request
    end

    protected

         def configure_permitted_parameters
              devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:name, :email, :password)}

              devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:name, :email, :password, :current_password)}
         end

end