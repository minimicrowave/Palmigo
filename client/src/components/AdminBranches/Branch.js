import React, {Component} from "react";
import { NavLink , Redirect} from "react-router-dom";

class Branch extends Component {
    constructor(){
        super();
        this.state = {
            branch: '',
            contact: '',
            location: ''
        };
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(event){
        let value = event.target.value;
        let name = event.target.name;

        this.setState({[name]: value, error: ""});
        console.log(this.state);
    }
    
    // static getDerivedStateFromProps(nextProps, prevState){
    //     console.log('next props', nextProps, 'prev state', prevState)
    //     let branchNo = nextProps.match.params.branch_no
    //     let branch = [...nextProps.allAdminBranches].find(element => {
    //         return element.id === parseInt(branchNo);
    //     })
    //     console.log('branch', branch)
    //     if (!branch){
    //         return null;
    //     }  else if (prevState.branch.id!==branch.id){
    //         return {
    //             branch: branch.name,
    //             contact: branch.contact,
    //             location: branch.location
    //         }
    //     } else {
    //         return null;
    //     }
    // }
    
    componentDidMount(){
        let branchNo = this.props.match.params.branch_no;
        console.log(this.props.allAdminBranches)
        let branch = [...this.props.allAdminBranches].find(element => {
            return element.id === parseInt(branchNo);
        })
        if (branch) {
            this.setState({
                branch: branch.name,
                contact: branch.contact,
                location: branch.location
            })
        }
    }

    render(){
        console.log(this.state)
        let id = this.props.match.params.branch_no;
        let branch = [...this.props.allAdminBranches].find(element => {
            return element.id === parseInt(id);
        });

        if (branch) {
            return (
                <div>
                    <h1>Branch: <input name='branch' defaultValue={branch.name} onChange={this.changeHandler}></input></h1>
                    <h3>Contact: <input name='contact' defaultValue={branch.contact} onChange={this.changeHandler}></input></h3>
                    <h3>Location: <input name='location' defaultValue={branch.location} onChange={this.changeHandler}></input></h3>
                    <button onClick={this.submitHandler}>Submit</button>
                    <NavLink to="/">Back</NavLink>
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