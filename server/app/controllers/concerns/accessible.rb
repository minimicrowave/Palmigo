module Accessible
    extend ActiveSupport::Concern
    included do
      before_action :check_user
    end
  
    protected
    def check_user
      if current_admin
        flash.clear
        # if you have rails_admin. You can redirect anywhere really
        redirect_to(admin_branches_path) && return
      elsif current_staff
        flash.clear
        # The authenticated root path can be defined in your routes.rb in: devise_scope :staff do...
        redirect_to(staff_details_path) && return
      end
    end
  end