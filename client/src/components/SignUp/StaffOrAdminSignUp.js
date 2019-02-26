import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class StaffOrAdminSignUp extends Component {
    render(){
        return (
            <div>
                <h3><NavLink to='/staff/sign_up'>I'm a Staff member.</NavLink></h3>
                <h3><NavLink to='/admin/sign_up'>I'm a Company administrator.</NavLink></h3>
            </div>
        )
    }
}

export default StaffOrAdminSignUp;