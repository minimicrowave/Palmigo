require 'test_helper'

class AdminBranchesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_branch = admin_branches(:one)
  end

  test "should get index" do
    get admin_branches_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_branch_url
    assert_response :success
  end

  test "should create admin_branch" do
    assert_difference('AdminBranch.count') do
      post admin_branches_url, params: { admin_branch: { contact: @admin_branch.contact, location: @admin_branch.location, name: @admin_branch.name } }
    end

    assert_redirected_to admin_branch_url(AdminBranch.last)
  end

  test "should show admin_branch" do
    get admin_branch_url(@admin_branch)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_branch_url(@admin_branch)
    assert_response :success
  end

  test "should update admin_branch" do
    patch admin_branch_url(@admin_branch), params: { admin_branch: { contact: @admin_branch.contact, location: @admin_branch.location, name: @admin_branch.name } }
    assert_redirected_to admin_branch_url(@admin_branch)
  end

  test "should destroy admin_branch" do
    assert_difference('AdminBranch.count', -1) do
      delete admin_branch_url(@admin_branch)
    end

    assert_redirected_to admin_branches_url
  end
end
