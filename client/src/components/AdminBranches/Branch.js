import React, {Component} from "react";
import { NavLink , Redirect} from "react-router-dom";

class Branch extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            contact: '',
            location: '',
            redirect: false
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(event){
        let value = event.target.value;
        let name = event.target.name;

        this.setState({[name]: value, error: ""});
    }
    
    submitHandler(id){
        console.log(this.state)
        if (!this.state.name || !this.state.contact || !this.state.location) {
            this.setState({error: 'Please do not leave any fields blank.'})
        } else {
            this.setState({redirect: true})
            this.props.updateBranchHandler(id, {
                name: this.state.name,
                contact: this.state.contact,
                location: this.state.location
            }, )
        }
    }
    
    componentDidMount(){
        let branchNo = this.props.match.params.branch_no;
        console.log(this.props.allAdminBranches)
        let branch = [...this.props.allAdminBranches].find(element => {
            return element.id === parseInt(branchNo);
        })
        if (branch) {
            this.setState({
                name: branch.name,
                contact: branch.contact,
                location: branch.location
            })
        }
    }

    render(){
        let id = this.props.match.params.branch_no;
        let branch = [...this.props.allAdminBranches].find(element => {
            return element.id === parseInt(id);
        });

        if (branch) {
            return (
                <div>
                    <h1>Branch: <input name='name' defaultValue={branch.name} onChange={this.changeHandler}></input></h1>
                    <h3>Contact: <input name='contact' type="number" defaultValue={branch.contact} onChange={this.changeHandler}></input></h3>
                    <h3>Location: <input name='location' defaultValue={branch.location} onChange={this.changeHandler}></input></h3>
                    <button onClick={() => {this.submitHandler(branch.id)}}>Submit</button>
                    <p>{this.state.error}</p>
                    <NavLink to="/">Back</NavLink>
                    {this.state.redirect? (<Redirect to='/'/>) : null}
                </div>
            )
        } else {
            return (
                <Redirect to="/"/>
            )
        }
    }
}

export default Branch;