Rails.application.routes.draw do
  resources :shifts
  devise_for :staffs, path: 'staffs', controllers: { sessions: "staffs/sessions", registrations: "staffs/registrations"}
  devise_for :admins, path: 'admins', controllers: { sessions: "admins/sessions", registrations: "admins/registrations"}
  resources :staff_details
  resources :admin_branches

  get '/admin/validate' => 'admin_branches#validate'
  get '/admin/stafflist' => 'admin_branches#staffList'
  get '/staff/validate' => 'staff_details#validate'
  get '/staff/companylist' => 'staff_details#companyList'
  get '/staff/branchlist' => 'staff_details#branchList'
  
  get '/admin/shiftlist' => 'admin_branches#shiftList'
  patch '/admin/staffshift' => 'staff_shifts#staffShiftPost'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
