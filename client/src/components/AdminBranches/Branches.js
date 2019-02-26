import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";

class Branches extends Component {
    constructor() {
        super();
        this.state = {
            dataLoaded: false,
            data: [],
            toggle: false,
            toggleText: 'New Branch',
        }   
        this.toggleHandler = this.toggleHandler.bind(this);
        this.toggleDivHandler = this.toggleDivHandler.bind(this);
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

    toggleHandler() {
        if (this.state.toggleText === 'New Branch') {
            this.setState({toggleText: '^ Hide', toggle: true})
        } else {
            this.setState({toggleText: 'New Branch', toggle: false})
        }
    }

    toggleDivHandler(){
        if (this.state.toggle) {
            return (
                <NewBranch/>
            )
        } else {
            return (<div></div>)
        }
    }

    render(){
        let branches = [...this.state.data];
        branches = branches.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));        
        let eachBranch = branches.map((branch, index) => {
            return (
                <div>
                    <h2>{branch.name}</h2>
                    <p>{branch.contact}</p>
                    <p>{branch.location}</p>
                    <NavLink to={{pathname: `branch/${index+1}`, state: {data: branch}}}>Edit</NavLink>
                    <p>Delete</p>
                </div>
            )
        })
        return (
            <div>
                <h1>My Branches</h1>
                {this.toggleDivHandler()}
                <button onClick={this.toggleHandler}>{this.state.toggleText}</button>
                {eachBranch}
            </div>
        )
    }
}


class NewBranch extends Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            branchName: '',
            contactNo: '',
            location: '', 
            error: ''
        }
    } 

    clickHandler(event){
        console.log("hi")
    }

    changeHandler(event){
        let value = event.target.value;
        let name = event.target.name;

        this.setState({[name]: value, error: ""});
        console.log(this.state)
    }

    render() {
        return(
            <div>
                <h3>New Branch</h3>
                <form>
                <p>Branch Name: </p><input name="branchName" onChange={this.changeHandler} required/>
                <p>Contact No: </p><input name="contactNo" type="number" onChange={this.changeHandler} required/>
                <p>Location: </p><input name="location" onChange={this.changeHandler} required/>
                <button onClick={this.clickHandler()}>Submit</button>
                <p>{this.state.error}</p>

                </form>
            </div>
        )
    }
}
export default Branches;