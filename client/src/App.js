import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import StaffOrAdminSignUp from './components/SignUp/StaffOrAdminSignUp';
import Main from './components/Main/Main';

class App extends Component {
  constructor() {
    super();
    this.state = {
      validation: false,
      user: ""
    };
  }

  componentDidMount() {
    // check if either user or admin is logged in
    Axios.get('/admin/validate')
    .then(response => {
      console.log(response)
      console.log("Admin is logged in.")
      this.setState({validation: true, user: 'admin'});
    })
    .catch(error => {
      console.log(error)
  
      Axios.get('/staff/validate')
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

  render() {
    console.log("App", this.state)
    return (
      <div className="App">
      <h3>Hello, I'm just a placeholder.</h3>
        <BrowserRouter>
					<Switch>
						<Route exact path="/login" component={LoginForm} />
						<Route exact path="/sign_up" component={StaffOrAdminSignUp} />
						<Route path="/" render={() => <Main validation={this.state.validation}  user={this.state.user} />} />
					</Switch>
				</BrowserRouter>
      </div>
    );
  }
// }
}

export default App;
