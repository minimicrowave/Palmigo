import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class StaffSignUp extends Component {
    constructor(){
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.enterHandler = this.enterHandler.bind(this);
        this.state = {
            email: "",
            password: "",
            error: "",
        }
    }

    clickHandler(){
        console.log("Sending post request to staffs/sign_up")
        axios.post('/staffs/sign_up', {staff:{
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
                <h1>Staff Signup</h1>
                <p>Email: <input name="email" onChange={this.changeHandler} required></input></p>
                <p>Password: <input name="password" type="password" onChange={this.changeHandler} onKeyUp={this.enterHandler} required></input></p>
                <button onClick={this.clickHandler}>Submit</button>

                <h3><NavLink to='/admin/sign_up'>Admin? Sign up here</NavLink></h3>
                <h4><NavLink to='/'>Back</NavLink></h4>
            </div>
        )
    }
}

export default StaffSignUp;