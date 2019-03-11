import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Form, Button, Input, Select, Header, Icon, Visibility, Container, Menu } from "semantic-ui-react";
import Clock from "react-digital-clock";
import HeaderPhoto from "../../splashpicture.png";
import NavBar from "../NavBar/NavBar";

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
      allAdminOptions: [],
      allBranches: [],
      filteredBranches: '',
      menuFixed: false,
      overlayFixed: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.date = this.date.bind(this);
    this.adminHandler = this.adminHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var array = [];
    if (nextProps.allAdmins) {
      array = this.adminHandler(nextProps.allAdmins)
    }
    this.setState({
      allAdmins: nextProps.allAdmins,
      allAdminOptions: array,
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
        admin_branch_id: parseInt(this.state.branch)
      };
      this.props.addStaffDetailsHandler(obj);
    }
  }

  changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({ [name]: value, error: "" });
  }

  selectHandler(event, option) {
    let name = option.name;
    let value = option.value;

    this.setState({ [name]: value, error: "" });
  }

  date() {
    let today = (new Date()).toString().slice(0, 15)
    return (<p style={{color: 'white'}}>{today}</p>);
  }

  adminHandler(array) {
    if (array) {
      array = array.map(admin => {
        return ({text: `${admin.name}`, value: `${admin.id}`})
      });
      return array;
    }
  }

  stickOverlay = () => this.setState({ overlayFixed: true });
  stickTopMenu = () => this.setState({ menuFixed: true });
  unStickOverlay = () => this.setState({ overlayFixed: false });
  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const employmentOptions = [{text:"Part-Time", value:"Part-Time"}, {text:"Full-Time", value: "Full-Time"}]

    const divBody = {
      margin: "2em 2em"
    };

    const { menuFixed, overlayFixed } = this.state;

    const menuStyle = {
      border: "none",
      borderRadius: 0,
      boxShadow: "none",
      marginBottom: "1em",
      transition: "box-shadow 0.5s ease, padding 0.5s ease",
      backgroundColor: "#b2d8d8"
    };

    const fixedMenuStyle = {
      backgroundColor: "#b2d8d8",
      border: "1px solid #ddd",
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"
    };

    const overlayStyle = {
      float: "left",
      margin: "0em 3em 1em 0em"
    };

    const fixedOverlayStyle = {
      ...overlayStyle,
      position: "fixed",
      top: "80px",
      zIndex: 10
    };

    const overlayMenuStyle = {
      position: "relative",
      left: 0,
      transition: "left 0.5s ease"
    };

    const fixedOverlayMenuStyle = {
      ...overlayMenuStyle,
      left: "800px"
    };

    const HeaderPhotoStyle = {
      width: "100%"
    };

    // if staff details not intialised
    if (!this.props.staff_details) {
      return (
        <div>
          <NavBar/>
          <div style={divBody}>

          <Header as='h2'>
            <Icon name='pencil' />
            <Header.Content>
              Account Settings
              <Header.Subheader>Initialise your details to continue</Header.Subheader>
            </Header.Content>
          </Header>
                
          <Form>
          <Form.Group>
              <Form.Field
                control={Input}
                name="name"
                label="Name"
                placeholder="Name"
                onChange={this.changeHandler}
                required
              />
              <Form.Field
                control={Input}
                name="contactNo"
                type="number"
                label="Contact"
                placeholder="Contact"
                onChange={this.changeHandler}
                required
              />
              <Form.Field
                control={Input}
                name="jobTitle"
                label="Job Title"
                placeholder="Job Title"
                onChange={this.changeHandler}
                required
              />
              <Form.Field
                name="employmentType"
                label="Employment Type"
                control={Select}
                options={employmentOptions}
                placeholder="Select Employment Type"
                onChange={this.selectHandler}
              />
              <Form.Field
                name="company"
                label="Company"
                control={Select}
                options={this.state.allAdminOptions}
                placeholder="Select Employment Type"
                onChange={(event, option)=>{this.props.adminBranchFilter(option.value)}}
              />
              <Form.Field
                name="branch"
                label="Branch"
                control={Select}
                options={this.state.filteredBranches}
                placeholder="Select Branch"
                onChange={this.selectHandler}
              />
            <Form.Field onClick={this.clickHandler} control={Button} style={{marginTop: '23px'}}>
              Submit
            </Form.Field>
            </Form.Group>
              <p>{this.state.error}</p>

        </Form>
        </div>
        </div>
      );

      // if staff details intialised
    } else {
      return (
           <div>
        <div>
          <img src={HeaderPhoto} style={HeaderPhotoStyle} />
        </div>

        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed ? "top" : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container>
              <Menu.Item>
                <Icon name="home" size="large" />
              </Menu.Item>
              <Menu.Item header>Hello, {this.props.staff_information[0].name}</Menu.Item>
              <Menu.Item header
              as={NavLink}
              to={{ pathname: `/edit` }}>Edit Profile</Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item>{this.date()}</Menu.Item>
                <Menu.Item>
                  <Clock hour12={false} />
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
        <div style={divBody}>
        </div>
        </div>
      );
    }
  }
}
export default Staff;
