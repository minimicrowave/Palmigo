json.extract! staff_detail, :id, :name, :contact, :job_title, :employment_type, :created_at, :updated_at
json.url staff_detail_url(staff_detail, format: :json)
