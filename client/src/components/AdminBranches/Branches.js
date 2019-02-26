import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";

class Branches extends Component {
    constructor() {
        super();
        this.state = {
            dataLoaded: false,
            data: []
        }   
    }

    componentDidMount(){
        
        Axios.get('/admin_branches')
        .then(response => {
          console.log(response)
          this.setState({dataLoaded: true, data: response.data})
        })
        .catch(error => {
          console.log("Data retrieval unsuccessul. \n", error)
          this.setState({dataLoaded: false})
        })
    }

    render(){
        let branches = [...this.state.data];
        branches = branches.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));        let eachBranch = branches.map((branch, index) => {
            return (
                <div>
                    <h2>{branch.name}</h2>
                    <p>{branch.contact}</p>
                    <p>{branch.location}</p>
                    <NavLink to={{pathname: `branch/${index+1}`, state: {data: branch}}}>View</NavLink>
                </div>
            )
        })
        return (
            <div>
                <h1>My Branches</h1>
                {eachBranch}
            </div>
        )
    }
}

export default Branches;