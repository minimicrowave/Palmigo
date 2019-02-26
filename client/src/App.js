import React, { Component } from 'react';
import './App.css';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import StaffOrAdminSignUp from './components/SignUp/StaffOrAdminSignUp';
import StaffSignUp from './components/SignUp/StaffSignUp';
import AdminSignUp from './components/SignUp/AdminSignUp';
import AdminHome from './components/Home/AdminHome';
import StaffHome from './components/Home/StaffHome';
import Main from './components/Main/Main';
import Axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      validation: false,
      user: ""
    }
    this.checkValidation = this.checkValidation.bind(this);
  }

  componentDidMount() {
    // check if either user or admin is logged in
    Axios.get('admin/validate')
    .then(response => {
      console.log(response)
      console.log("Admin is logged in.")
        this.setState({validation: true, user: 'admin',path:"/admin/dashboard"});
    })
    .catch(error => {
      console.log(error)
  
      Axios.get('staff/validate')
      .then(response =>{
          console.log(response);
          console.log("Staff is logged in.")
          this.setState({validation: true, user: 'staff'}) 
        })
        .catch(error => {
        console.log(error);
        this.setState({validation: false, user: ''}) 
        console.log("Not logged in.")
      })
    })
  }
  
  checkValidation(){
    if (this.state.validation) {
      if (this.state.user === "admin") {
        return <Redirect to="/admin/dashboard"/>
      } else if (this.state.user === "staff") {
        return <Redirect to="/staff/dashboard"/>
      }
    }
  }

  render() {
    // if (this.state.validation){
      // return (<Redirect to={this.state.path}/>)
    // }    else{
    return (
      <div className="App">
      <h3>Hello, I'm just a placeholder.</h3>
        <BrowserRouter>
					<Switch>
						<Route exact path="/login" component={LoginForm} />
						<Route exact path="/sign_up" component={StaffOrAdminSignUp} />
						<Route exact path="/staff/sign_up" component={StaffSignUp} />
						<Route exact path="/admin/sign_up" component={AdminSignUp} />
						<Route exact path="/dashboard" component={StaffHome} />
						<Route path="/" component={Main} />
					</Switch>
				</BrowserRouter>
      </div>
    );
  }
// }
}

export default App;
