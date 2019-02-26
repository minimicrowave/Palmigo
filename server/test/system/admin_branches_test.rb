require "application_system_test_case"

class AdminBranchesTest < ApplicationSystemTestCase
  setup do
    @admin_branch = admin_branches(:one)
  end

  test "visiting the index" do
    visit admin_branches_url
    assert_selector "h1", text: "Admin Branches"
  end

  test "creating a Admin branch" do
    visit admin_branches_url
    click_on "New Admin Branch"

    fill_in "Contact", with: @admin_branch.contact
    fill_in "Location", with: @admin_branch.location
    fill_in "Name", with: @admin_branch.name
    click_on "Create Admin branch"

    assert_text "Admin branch was successfully created"
    click_on "Back"
  end

  test "updating a Admin branch" do
    visit admin_branches_url
    click_on "Edit", match: :first

    fill_in "Contact", with: @admin_branch.contact
    fill_in "Location", with: @admin_branch.location
    fill_in "Name", with: @admin_branch.name
    click_on "Update Admin branch"

    assert_text "Admin branch was successfully updated"
    click_on "Back"
  end

  test "destroying a Admin branch" do
    visit admin_branches_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Admin branch was successfully destroyed"
  end
end
