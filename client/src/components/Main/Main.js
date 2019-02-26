import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class Login extends Component {
    render(){
        return (
            <div>
                <h1>Adios Amigo!</h1>
                <h3><NavLink to='/login'>Login</NavLink></h3>
                <h3><NavLink to='/sign_up'>No account? Register here</NavLink></h3>
            </div>
        )
    }
}

export default Login;