import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import {
  Button,
  Icon,
  Header,
  Form,
  Input,
  Divider,
  List
} from "semantic-ui-react";
import NavBar from "../NavBar/NavBar";

class StaffDetails extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      name: "",
      contactNo: "",
      allAdmins: [],
      allBranches: [],
      filteredBranches: ""
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.staff_information[0].name,
      contactNo: this.props.staff_information[0].contact,
      allAdmins: this.props.allAdmins,
      allBranches: this.props.allBranches
    });
  }

  componentWillReceiveProps(nextProps) {
    // in the event that companies / branches is changed
    this.setState({
      allAdmins: nextProps.allAdmins,
      allBranches: nextProps.allBranches,
      filteredBranches: nextProps.filteredBranches
    });
  }

  clickHandler() {
    if (!this.state.name || !this.state.contactNo) {
      this.setState({ error: "Please do not leave any fields blank." });
    } else {
      let obj = {
        name: this.state.name,
        contact: parseInt(this.state.contactNo)
      };
      this.props.updateStaffDetailsHandler(
        obj,
        this.props.staff_information[0].id
      );
    }
  }

  changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({ [name]: value, error: "" });
  }

  render() {
    const divBody = {
      margin: "2em 2em"
    };
    let allBranches = [...this.state.allBranches];
    let allAdmins = [...this.state.allAdmins];

    var companyname;
    var branchname;
    console.log(allBranches, allAdmins, this.props.staff_information);
    if (allBranches.length > 0 && allAdmins.length > 0) {
      branchname = allBranches.filter(
        branch => branch.id === this.props.staff_information[0].admin_branch_id
      )[0].name;
      companyname = allAdmins.filter(
        branch => branch.id === this.props.staff_information[0].staff_id
      )[0].name;
    }

    if (this.props.staff_details & (this.props.history.action !== "POP")) {
      return (
        <div>
          <NavBar />
          <div style={divBody}>
            <Button color="grey" size="small" animated as={NavLink} to="/">
              <Button.Content visible>Back</Button.Content>
              <Button.Content hidden>
                <Icon name="angle left" />
              </Button.Content>
            </Button>
            <Header as="h2" icon="pencil" content="Edit Profile" />
            <Form>
              <Form.Group>
                <Form.Field
                  control={Input}
                  name="name"
                  label="Name"
                  defaultValue={this.state.name}
                  onChange={this.changeHandler}
                  required
                />
                <Form.Field
                  control={Input}
                  name="contactNo"
                  type="number"
                  label="Contact"
                  defaultValue={this.state.contactNo}
                  onChange={this.changeHandler}
                  required
                />
                <Form.Field
                  onClick={this.clickHandler}
                  control={Button}
                  style={{ marginTop: "23px" }}
                >
                  Submit
                </Form.Field>
              </Form.Group>
            </Form>
            <p>{this.state.error}</p>
            <Divider />
            <List>
              <List.Item
                icon="users"
                content={`${this.props.staff_information[0].employment_type}`}
              />
              <List.Item
                icon="briefcase"
                content={`${this.props.staff_information[0].job_title}`}
              />
              <List.Item
                icon="warehouse"
                content={`${companyname} @ ${branchname}`}
              />
            </List>

            {this.props.redirect ? <Redirect to="/" /> : null}
          </div>
        </div>
      );

      // if staff details intialised
    } else {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    }
  }
}

export default StaffDetails;
