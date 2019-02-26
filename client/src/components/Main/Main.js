import React, {Component} from "react";
import { Switch, Route, BrowserRouter, NavLink, Redirect } from "react-router-dom";
import Axios from 'axios';

class Main extends Component {
    constructor() {
        super();
        this.state = {
          validation: false,
          user: ""
        }
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
      
    render() {
        if (this.state.validation) {
        return (
            <div>
                I'm logged in as {this.state.user}!
            </div> )
        } else {
            return (
                <div>
                    <h1>Adios Amigo!</h1>
                    <h3><NavLink to='/login'>Login</NavLink></h3>
                    <h3><NavLink to='/sign_up'>No account? Register here</NavLink></h3>
                </div>
            )
        }
    }
}

export default Main;