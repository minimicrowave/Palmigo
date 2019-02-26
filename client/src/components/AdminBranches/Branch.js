import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class Branch extends Component {
    constructor() {
        super();
        this.state = {
        }   
    }

    render(){
        console.log(this.props)
        let id = this.props.location.pathname.slice(8);
        let branch = this.props.location.state.data
        return (
            <div>
                <h1>Branch #{id}: {branch.name}</h1>
                <h3>{branch.contact}</h3>
                <h3>{branch.location}</h3>
                <NavLink to="/">Back</NavLink>
            </div>
        )
    }
}

export default Branch;