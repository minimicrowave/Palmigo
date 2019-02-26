import React, {Component} from "react";
import SignUpForm from './SignUpForm';
import { NavLink } from "react-router-dom";

class StaffOrAdminSignUp extends Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.state = {
            user: ""
        }   
    }

    clickHandler(event) {
        this.setState({user: event.target.dataset.id})
    }

    render(){
        return (
            <div>
                <h3 data-id="Staffs" onClick={this.clickHandler}>I'm a Staff member.</h3>
                <h3 data-id="Admins" onClick={this.clickHandler}>I'm a Company administrator.</h3>
                <SignUpForm user={this.state.user} />
                <h4><NavLink to='/'>Back</NavLink></h4>
            </div>
        )
    }
}

export default StaffOrAdminSignUp;