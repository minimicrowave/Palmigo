require "application_system_test_case"

class StaffDetailsTest < ApplicationSystemTestCase
  setup do
    @staff_detail = staff_details(:one)
  end

  test "visiting the index" do
    visit staff_details_url
    assert_selector "h1", text: "Staff Details"
  end

  test "creating a Staff detail" do
    visit staff_details_url
    click_on "New Staff Detail"

    fill_in "Contact", with: @staff_detail.contact
    fill_in "Employment type", with: @staff_detail.employment_type
    fill_in "Job title", with: @staff_detail.job_title
    fill_in "Name", with: @staff_detail.name
    click_on "Create Staff detail"

    assert_text "Staff detail was successfully created"
    click_on "Back"
  end

  test "updating a Staff detail" do
    visit staff_details_url
    click_on "Edit", match: :first

    fill_in "Contact", with: @staff_detail.contact
    fill_in "Employment type", with: @staff_detail.employment_type
    fill_in "Job title", with: @staff_detail.job_title
    fill_in "Name", with: @staff_detail.name
    click_on "Update Staff detail"

    assert_text "Staff detail was successfully updated"
    click_on "Back"
  end

  test "destroying a Staff detail" do
    visit staff_details_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Staff detail was successfully destroyed"
  end
end
