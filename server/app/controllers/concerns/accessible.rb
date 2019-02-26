module Accessible
    extend ActiveSupport::Concern
    included do
      before_action :check_user
    end
  
    protected
    def check_user
    end
  end