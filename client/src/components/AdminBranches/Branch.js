import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class Branch extends Component {
    constructor() {
        super();
        this.state = {
            allAdminBranches: []
        }   
    }

    render(){
            let id = this.props.location.pathname.slice(8);
            let branch = [...this.props.allAdminBranches][id-1];
        if (branch) {
            return (
                <div>
                    <h1>Branch #{id}: {branch.name}</h1>
                    <h3>{branch.contact}</h3>
                    <h3>{branch.location}</h3>
                    <NavLink to="/">Back</NavLink>
                </div>
            )
        } else {
            return (<div>
                <p>Oh no, page does not exist!</p>
                <NavLink to="/">Back</NavLink>
                </div>)
        }
    }
}

export default Branch;