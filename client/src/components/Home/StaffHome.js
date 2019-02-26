import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class StaffHome extends Component {
    render(){
        return (
            <div>
                <h1>Staff Dashboard</h1>
                <h3><NavLink to='/staff/dashboard'>Dashboard</NavLink></h3>
            </div>
        )
    }
}

export default StaffHome;