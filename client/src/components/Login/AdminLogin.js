import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class AdminLogin extends Component {
    constructor(){
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.enterHandler = this.enterHandler.bind(this);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    clickHandler(){
        console.log("Sending post request to admins/sign_in")
        axios.post('/admins/sign_in', {admin:{
            email: this.state.email,
            password: this.state.password
        }})
        .then(response =>
            console.log(response)
        )
        .catch(error => {
            console.log(error);
            this.setState({error: "Invalid email or password. Please try again."});
        })
    }

    changeHandler(event){
        let value = event.target.value;
        let name = event.target.name;

        this.setState({[name]: value, error: ""});
        console.log(this.state);
    }

    enterHandler(event){
        if (event.keyCode === 13 && this.state.email && this.state.password){
            this.clickHandler();
        }
    }

    render(){
        return (
            <div>
                <h1>Admin Login</h1>
                <p>Email: <input name="email" onChange={this.changeHandler} required></input></p>
                <p>Password: <input name="password" type="password" onChange={this.changeHandler} onKeyUp={this.enterHandler} required></input></p>
                <p>{this.state.error}</p>
                <button onClick={this.clickHandler}>Submit</button>

                <h3><NavLink to='/staff/login'>Staff? Login here</NavLink></h3>
                <h4><NavLink to='/'>Back</NavLink></h4>
            </div>
        )
    }
}

export default AdminLogin;