import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class AdminHome extends Component {
    render(){
        return (
            <div>
                <h1>Admin Dashboard</h1>
                <h3><NavLink to='/admin/dashboard'>Dashboard</NavLink></h3>
            </div>
        )
    }
}

export default AdminHome;