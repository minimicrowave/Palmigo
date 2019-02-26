class Admin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :admin_branches
  has_many :shifts, through: :admin_branches
  has_many :staff_details, through: :admin_branches
end
