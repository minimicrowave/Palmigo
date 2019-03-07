import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Staff extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      name: "",
      contactNo: "",
      jobTitle: "",
      employmentType: "",
      branch: "",
      company: "",
      allAdmins: [],
      allBranches: [],
      filteredBranches: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allAdmins: nextProps.allAdmins,
      allBranches: nextProps.allBranches,
      filteredBranches: nextProps.filteredBranches
    });
  }


  clickHandler() {
    if (
      !this.state.name ||
      !this.state.contactNo ||
      !this.state.jobTitle ||
      !this.state.branch ||
      !this.state.employmentType
    ) {
      this.setState({ error: "Please do not leave any fields blank." });
    } else {
      let obj = {
        name: this.state.name,
        contact: parseInt(this.state.contactNo),
        job_title: this.state.jobTitle,
        employment_type: this.state.employmentType,
        admin_branches_id: parseInt(this.state.branch)
      };
      this.props.addStaffDetailsHandler(obj);
    }
  }

  changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({ [name]: value, error: "" });
  }

  render() {
    var admins;
    if (this.state.allAdmins) {
      admins = this.state.allAdmins.map(admin => {
        return <option value={admin.id}>{admin.name}</option>;
      });
    }

    // if staff details not intialised
    if (!this.props.staff_details) {
      return (
        <div>
          <h3>NO DETAILS - Please fill in before continuing</h3>
          <h3>Staff Details</h3>
          <p>Name: </p>
          <input name="name" onChange={this.changeHandler} required />
          <p>Contact No: </p>
          <input
            name="contactNo"
            type="number"
            onChange={this.changeHandler}
            required
          />
          <p>Job Title: </p>
          <input name="jobTitle" onChange={this.changeHandler} required />
          <p>
            Employment Type:{" "}
            <select
              name="employmentType"
              onChange={this.changeHandler}
              required
            >
              <option defaultValue selected="selected" disabled>
                Select Employment Type
              </option>
              <option value="Part-Time">Part Time</option>
              <option value="Full-Time">Full Time</option>
            </select>
          </p>
          <p>
            Company:{" "}
            <select name="company" onChange={this.props.adminBranchFilter} required>
              <option defaultValue selected="selected" disabled>
                Select Company
              </option>
              {admins}
            </select>
          </p>
          <p>
            Branch:{" "}
            <select name="branch" onChange={this.changeHandler} required>
              <option defaultValue selected="selected" disabled>
                Select Branch
              </option>
              {this.state.filteredBranches}
            </select>
          </p>
          <button onClick={this.clickHandler}>Submit</button>
          <p>{this.state.error}</p>
        </div>
      );

      // if staff details intialised
    } else {
      return (
        <div>
        <h3>My name is {this.props.staff_information[0].name}</h3>
          <NavLink to="/edit">Edit my Information</NavLink>
        </div>
      );
    }
  }
}
export default Staff;
