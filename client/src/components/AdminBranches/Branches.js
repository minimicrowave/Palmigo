import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class Branches extends Component {
    constructor() {
        super();
        this.state = {
            allAdminBranches: [],
            data: [],
            toggle: false,
            toggleText: 'New Branch',
        }   
        this.toggleHandler = this.toggleHandler.bind(this);
        this.toggleDivHandler = this.toggleDivHandler.bind(this);
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
                <NewBranch newBranchHandler={this.props.newBranchHandler} toggleHandler={this.toggleHandler}/>
            )
        } else {
            return (<div></div>)
        }
    }

    render(){
        let branches = [...this.props.allAdminBranches];
        branches = branches.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));        
        let eachBranch = branches.map((branch, index) => {
            return (
                <div>#{index+1}
                    <h2>{branch.name}</h2>
                    <p>{branch.contact}</p>
                    <p>{branch.location}</p>
                    <p>Branch ID: {branch.id}</p>
                    <NavLink to={{pathname: `branch/${branch.id}`}}>Edit</NavLink>
                    <p data-id={branch.id} onClick={event => this.props.deleteBranchHandler(event)}>Delete</p>
                </div>
            )
        })
        return (
            <div>
                <h1>My Branches</h1>
                <button onClick={this.toggleHandler}>{this.state.toggleText}</button>
                {this.toggleDivHandler()}
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
            error: '',
        }
    } 

    clickHandler(){
        if (!this.state.branchName || !this.state.contactNo || !this.state.location){
            this.setState({error: 'Please do not leave any fields blank.'})
        } else {
           this.props.newBranchHandler(this.state.branchName, this.state.contactNo, this.state.location);
           this.props.toggleHandler();
        }
    }

    changeHandler(event){
        let value = event.target.value;
        let name = event.target.name;

        this.setState({[name]: value, error: ""});
    }

    render() {
        return(
            <div>
                <h3>New Branch</h3>
                <p>Branch Name: </p><input name="branchName" onChange={this.changeHandler} required/>
                <p>Contact No: </p><input name="contactNo" type="number" onChange={this.changeHandler} required/>
                <p>Location: </p><input name="location" onChange={this.changeHandler} required/>
                <button onClick={this.clickHandler}>Submit</button>
                <p>{this.state.error}</p>
            </div>
        )
    }
}
export default Branches;