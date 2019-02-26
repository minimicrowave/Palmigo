Rails.application.routes.draw do
  resources :shifts
  devise_for :staffs, path: 'staffs', controllers: { sessions: "staffs/sessions", registrations: "staffs/registrations"}
  devise_for :admins, path: 'admins', controllers: { sessions: "admins/sessions", registrations: "admins/registrations"}
  resources :staff_details
  resources :admin_branches

  get '/admin/validate' => 'admin_branches#validate'
  get '/staff/validate' => 'staff_details#validate'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
