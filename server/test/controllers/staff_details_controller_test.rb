require 'test_helper'

class StaffDetailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @staff_detail = staff_details(:one)
  end

  test "should get index" do
    get staff_details_url
    assert_response :success
  end

  test "should get new" do
    get new_staff_detail_url
    assert_response :success
  end

  test "should create staff_detail" do
    assert_difference('StaffDetail.count') do
      post staff_details_url, params: { staff_detail: { contact: @staff_detail.contact, employment_type: @staff_detail.employment_type, job_title: @staff_detail.job_title, name: @staff_detail.name } }
    end

    assert_redirected_to staff_detail_url(StaffDetail.last)
  end

  test "should show staff_detail" do
    get staff_detail_url(@staff_detail)
    assert_response :success
  end

  test "should get edit" do
    get edit_staff_detail_url(@staff_detail)
    assert_response :success
  end

  test "should update staff_detail" do
    patch staff_detail_url(@staff_detail), params: { staff_detail: { contact: @staff_detail.contact, employment_type: @staff_detail.employment_type, job_title: @staff_detail.job_title, name: @staff_detail.name } }
    assert_redirected_to staff_detail_url(@staff_detail)
  end

  test "should destroy staff_detail" do
    assert_difference('StaffDetail.count', -1) do
      delete staff_detail_url(@staff_detail)
    end

    assert_redirected_to staff_details_url
  end
end
