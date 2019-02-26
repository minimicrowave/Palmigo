import React, {Component} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

class LoginForm extends Component {
    constructor(){
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            email: "",
            password: "",
            error: "", 
            user: "staffs"
        }
    }
    
    clickHandler(){
        console.log(`Sending post request to ${this.state.user}/sign_in`)
        let tempUser = [this.state.user];
        tempUser = tempUser.slice(0, -1)

        axios.post(`/${this.state.user}/sign_in`, {[tempUser]:{
            email: this.state.email,
            password: this.state.password
        }})
        .then(response =>
            console.log(response)
        )
        .catch(error => {
            console.log(error)
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
                <h1>Login Page</h1>
                <p>Email: <input name="email" onChange={this.changeHandler} required></input></p>
                <p>Password: <input name="password" type="password" onChange={this.changeHandler} onKeyUp={this.enterHandler} required></input></p>
                <div>
                    <input type="radio" name="user" value="staffs" onChange={this.changeHandler}/><small>Staff</small>
                    <input type="radio" name="user" value="admins" onChange={this.changeHandler}/><small>Admin</small>
                </div>
                <button onClick={this.clickHandler}>Submit</button>
                
                <h4><NavLink to='/'>Back</NavLink></h4>
            </div>
        )
    }
}

export default LoginForm;