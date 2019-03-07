import React, {Component} from "react";
import axios from "axios";
import { NavLink, Redirect} from "react-router-dom";
import {Button, CustomCalendaButton, Checkbox, Form, Input, Radio, Select, TextArear} from 'semantic-ui-react';

class LoginForm extends Component {
    constructor(){
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.enterHandler = this.enterHandler.bind(this);
        this.state = {
            email: "",
            password: "",
            error: "", 
            user: "staffs",
            doRedirect: false
        }
    }
    
    clickHandler(event){
        if (!this.state.email || !this.state.password){
            this.setState({error: 'Please do not leave any fields blank.'})
        } else {
            console.log(`Sending post request to ${this.state.user}/sign_in`)
            let tempUser = this.state.user;
            tempUser = tempUser.slice(0, -1)
    
            axios.post(`/${this.state.user}/sign_in`, {[tempUser]:{
                email: this.state.email,
                password: this.state.password
            }})
            .then(response => {
                console.log(response)
                this.setState({doRedirect: true})
            })
            .catch(error => {
                console.log(error)
                this.setState({doRedirect: false})
                this.setState({error: "Invalid email or password. Please try again."});
            })
        }
    }

    changeHandler(event){
        let value = event.target.value;
        let name = event.target.name;
        // console.log({val}, event, value, name)

        this.setState({[name]: value, error: ""});
        console.log(this.state)
    }

    enterHandler(event){
        if (event.keyCode === 13 && this.state.email && this.state.password){
            this.clickHandler();
        }
    }

    render(){
        // let state = {};
        // const { value } = this.state;
        if (this.state.doRedirect) {
            return (<Redirect to="/"/>)
        } else {
            return (
                <div>
                    <h1>Login Page</h1>
                        <p>Email: <input name="email" onChange={this.changeHandler} required></input></p>
                        <p>Password: <input name="password" type="password" onChange={this.changeHandler} onKeyUp={this.enterHandler} required></input></p>
                        <div>
                            <input type="radio" name="user" value="staffs" onChange={this.changeHandler} checked="checked"/><small>Staff</small>
                            <input type="radio" name="user" value="admins" onChange={this.changeHandler}/><small>Admin</small>
                        </div>
                        <p>{this.state.error}</p>
                        <button onClick={this.clickHandler}>Submit</button>
                    
                    <h4><NavLink to='/'>Back</NavLink></h4>
                    {/* <Form className="landingpagecentre">
        <Form.Group widths='equal'>
          <Form.Field control={Input} name="email" label='Email' placeholder='Email' onChange={this.changeHandler}/>
          <Form.Field control={Input} name="password" type="password" label='Password' placeholder='Password' onChange={this.changeHandler}/>
        </Form.Group>
        <Form.Group inline>
          <label>Type</label>
          <Form.Field
            control={Radio}
            name="user"
            label='Staff'
            value='staffs'
            checked={this.state.user  === 'staffs'}
            onChange={this.changeHandler}
            />
          <Form.Field
            control={Radio}
            name="user"
            label='User'
            value='users'
            checked={this.state.user === 'users'}
            onChange={this.changeHandler}
          />
          
        </Form.Group>
        <Form.Field control={Button}>Submit</Form.Field>
      </Form> */}
                </div>
            )
        }
    }
}

export default LoginForm;