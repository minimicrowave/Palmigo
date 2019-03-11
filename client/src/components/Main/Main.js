import React, { Component } from "react";
import Axios from "axios";
import {
  Switch,
  Route,
  BrowserRouter,
  NavLink,
  Redirect
} from "react-router-dom";
import {
  Icon,
  Button,
} from "semantic-ui-react";

import Branches from "../AdminBranches/Branches";
import Branch from "../AdminBranches/Branch";
import Staff from "../Staff/Staff";
import StaffDetails from "../Staff/StaffDetails";
import Shifts from "../Shift/Shifts";
import ShiftStaff from "../Shift/ShiftStaff";
import backgroundImage from "../../mainpage.png"

class Main extends Component {
  constructor(props) {
    super();
    this.state = {
      todaysDate: '',
      validation: props.validation,
      user: props.user,
      name: props.name,
      redirect: false,
      staff_details: null,
      staff_information: [],
      allAdminBranches: [],
      allAdmins: [],
      allBranches: [],
      filteredBranches: [],
      allShifts: []
    };
    this.logoutHandler = this.logoutHandler.bind(this);
    this.getBranchesHandler = this.getBranchesHandler.bind(this);
    this.newBranchHandler = this.newBranchHandler.bind(this);
    this.deleteBranchHandler = this.deleteBranchHandler.bind(this);
    this.updateBranchHandler = this.updateBranchHandler.bind(this);
    this.getStaffHandler = this.getStaffHandler.bind(this);
    this.addStaffDetailsHandler = this.addStaffDetailsHandler.bind(this);
    this.adminGetter = this.adminGetter.bind(this);
    this.allAdminBranchesGetter = this.allAdminBranchesGetter.bind(this);
    this.updateStaffDetailsHandler = this.updateStaffDetailsHandler.bind(this);
    this.adminBranchFilter = this.adminBranchFilter.bind(this);
    this.getShiftsHandler = this.getShiftsHandler.bind(this);
    this.todaysDate = this.todaysDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // makes sure that once there's any change in parent component app, props is promptly updated and views are changed
    this.setState(nextProps);
  }

  componentWillMount() {
    this.props.update();
    this.getBranchesHandler();
    this.getStaffHandler();
    this.adminGetter();
    this.allAdminBranchesGetter();
    this.getShiftsHandler();
    this.todaysDate();
  }

  logoutHandler() {
    let tempLink = this.props.user + "s";
    Axios.delete(`/${tempLink}/sign_out`).then(response => {
      console.log(response);
      console.log("Logged out, bye!");
      this.props.update();
    });
  }

  // get the list of admins / companies
  adminGetter() {
    Axios.get("/staff/companylist")
      .then(response => {
        this.setState({ allAdmins: response.data });
      })
      .catch(error => {
        console.log("Admins retrieval unsuccessul. \n", error);
      });
  }

  // get the list of all branches
  allAdminBranchesGetter() {
    Axios.get("/staff/branchlist")
      .then(response => {
        this.setState({ allBranches: response.data });
      })
      .catch(error => {
        console.log("Admin Branches list retrieval unsuccessul. \n", error);
      });
  }

  // get all admin branches within company
  getBranchesHandler() {
    Axios.get("/admin_branches")
      .then(response => {
        this.setState({ allAdminBranches: response.data });
      })
      .catch(error => {
        console.log("Admin's branches retrieval unsuccessul. \n", error);
      });
  }

  // create new admin branches
  newBranchHandler(name, contact, location) {
    Axios.post("/admin_branches", {
      name: name,
      contact: contact,
      location: location
    })
      .then(response => {
        console.log(response);
        this.getBranchesHandler();
      })
      .catch(error => {
        console.log("Admin Branches retrieval unsuccessul. \n", error);
      });
  }

  // delete admin branches
  deleteBranchHandler(event) {
    let url = "/admin_branches/" + event.target.dataset.id;
    Axios.delete(url)
      .then(response => {
        console.log(response);
        this.getBranchesHandler();
      })
      .catch(error => {
        console.log("Delete branches unsuccessful. \n", error);
      });
  }

  // edit admin branches
  updateBranchHandler(id, obj) {
    let url = "/admin_branches/" + id;
    Axios.patch(url, obj)
      .then(response => {
        console.log(response);
        this.getBranchesHandler();
      })
      .catch(error => {
        console.log("Data update unsuccessful. \n", error);
      });
  }

  // get staff details
  getStaffHandler() {
    Axios.get("/staff_details")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            staff_details: true,
            staff_information: response.data,
            redirect: false
          });
        } else {
          this.setState({ staff_details: false });
        }
      })
      .catch(error => {
        this.setState({ staff_details: false });
        console.log("Staff Details retrieval unsuccessul. \n", error);
      });
  }

  // create new staff details
  addStaffDetailsHandler(obj) {
    console.log(obj);
    Axios.post("/staff_details", obj)
      .then(response => {
        console.log(response);
        this.getStaffHandler();
      })
      .catch(error => {
        console.log("Staff details add unsuccessul. \n", error);
      });
  }

  updateStaffDetailsHandler(obj, id) {
      console.log(obj, id);
      Axios.patch(`/staff_details/${id}`, obj)
      .then(response => {
        console.log(response);
        this.getStaffHandler();
        this.setState({redirect: true})
      })
      .catch(error => {
        console.log("Staff details update unsuccessful. \n", error);
      });
  }


  // gets the filtered company branches according to company selection
  adminBranchFilter(event) {
    let id = parseInt(event);
    let allBranches = [...this.state.allBranches];
    if (allBranches.length > 0) {
      let filteredBranches = allBranches
        .filter(branch => {
          return branch.admin_id === id;
        })
        .map(branch => {
          return ({text: `${branch.name}`, value: `${branch.id}`})
        });
      this.setState({ filteredBranches: filteredBranches });
    }
  }

  getShiftsHandler() {
    Axios.get(`/shifts`)
    .then(response => {
      this.setState({allShifts: response.data})
    })
    .catch(error => {
      console.log("Shifts retrieval unsuccessul. \n", error);
    });
  }

  todaysDate() {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy+ '-' + mm + '-' + dd;
    console.log('TODAY', today)
    this.setState({todaysDate: today})
  }

  
  render() {

    const mainPage = {
      height: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover'
    }
    
    const margin = {
      margin: '1vh 0'
    }

    const buttonProp = {
      position: 'absolute',
      float: 'right',
      right: '2%',
      top: '6%'
    }
    
    const softBackground = {
      color: 'white',
      width: '50vh',
      height: '50vh',
      position: 'relative',
      marginLeft: '22vh',
      top: '-70vh',
      // backgroundColor: `rgba(255, 255, 255, 0.5)`,
    }

    const titleText = {
      ...margin,
      fontFamily: 'Major Mono Display',
      fontSize: '6vh'
    }


    if (this.state.validation && this.state.user === "admin") {
      return (
        <div>
          <Button inverted color="standard" size="small" animated onClick={this.logoutHandler} style={buttonProp}>
            <Button.Content visible>Logout</Button.Content>
            <Button.Content hidden>
              <Icon name='sign-out' />
        </Button.Content>
        </Button>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Branches
                    {...props}
                    todaysDate={this.state.todaysDate}
                    name={this.state.name}
                    allAdminBranches={this.state.allAdminBranches}
                    newBranchHandler={this.newBranchHandler}
                    deleteBranchHandler={this.deleteBranchHandler}
                    allShifts={this.state.allShifts}
                    />
                    )}
                    />
              <Route
                path={`/branch/:branch_no`}
                render={props => (
                  <Branch
                  {...props}
                  allAdminBranches={this.state.allAdminBranches}
                  updateBranchHandler={this.updateBranchHandler}
                  />
                  )}
                  />
              <Route exact
                path={`/shifts`}
                render={props => (
                  <Shifts
                  {...props}
                  allAdminBranches={this.state.allAdminBranches}
                  allShifts={this.state.allShifts}
                  getShiftsHandler={this.getShiftsHandler}
                  />
                )}
              />
              <Route path="/shifts/:id" render={props => (<ShiftStaff {...props}/>)}/>
            </Switch>
          </BrowserRouter>
        </div>
      );
    } else if (this.state.validation && this.state.user === "staff") {
      return (
        <div>
          <Button inverted color="standard" size="small" animated onClick={this.logoutHandler} style={buttonProp}>
            <Button.Content visible>Logout</Button.Content>
            <Button.Content hidden>
              <Icon name='sign-out' />
        </Button.Content>
        </Button>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Staff
                    {...props}
                    name={this.state.name}
                    staff_details={this.state.staff_details}
                    addStaffDetailsHandler={this.addStaffDetailsHandler}
                    staff_information={this.state.staff_information}
                    allAdmins={this.state.allAdmins}
                    allBranches={this.state.allBranches}
                    filteredBranches={this.state.filteredBranches}
                    adminBranchFilter={this.adminBranchFilter}
                  />
                )}
              />
              <Route
                path="/edit"
                render={props => (<StaffDetails
                    {...props}
                    staff_information={this.state.staff_information}
                    staff_details={this.state.staff_details}
                    allAdmins={this.state.allAdmins}
                    allBranches={this.state.allBranches}
                    updateStaffDetailsHandler={this.updateStaffDetailsHandler}
                    redirect={this.state.redirect}
                    />
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div style={{height: '100vh'}}>
        <div style={mainPage}/>
          <div style={softBackground}>
            <h1 style={titleText}>all about convenience</h1>
            <p>Here at Palmigo, we strive to be your best pal, your amigo, bringing the convenience into your palms. </p>
        
              <Button.Group style={margin} size='large'>
              <Button
              compact
              inverted
              header
              as={NavLink}
              to={{ pathname: `/login` }}
              size="small"
              color="white"
            >Login</Button>
             <Button.Or />
              <Button
              compact
              inverted
              header
              as={NavLink}
              to={{ pathname: `/sign_up` }}
              size="small"
              color="white"
            >Register</Button>
            </Button.Group>
          </div>
        </div>
      );
    }
  }
}

export default Main;
