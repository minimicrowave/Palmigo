import React, {Component} from "react";
import Axios from 'axios';
import { Switch, Route, BrowserRouter, NavLink, Redirect } from "react-router-dom";
import Branches from '../AdminBranches/Branches'
import Branch from '../AdminBranches/Branch'

class Main extends Component {
    constructor(props) {
        super();
        this.state = {
            validation: props.validation,
            user: props.user,
            allAdminBranches: []
          };
        this.logoutHandler = this.logoutHandler.bind(this);
        this.getBranchesHandler = this.getBranchesHandler.bind(this);
        this.newBranchHandler = this.newBranchHandler.bind(this);
        this.deleteBranchHandler = this.deleteBranchHandler.bind(this);
        this.updateBranchHandler = this.updateBranchHandler.bind(this);
      }
      
    logoutHandler() {
        let tempLink = this.props.user + 's';
        Axios.delete(`/${tempLink}/sign_out`)
        .then(response => {
            console.log(response)
            console.log("Logged out, bye!");
            this.props.update();
        })
    }

    componentWillReceiveProps(nextProps) {
        // makes sure that once there's any change in parent component app, props is promptly updated and views are changed
        this.setState(nextProps);
    }

    
    componentWillMount() {
        this.props.update();
        this.getBranchesHandler();
    }

    // get all admin branches
    getBranchesHandler() {
        Axios.get('/admin_branches')
        .then(response => {
          console.log(response)
          this.setState({allAdminBranches: response.data})
        })
        .catch(error => {
          console.log("Data retrieval unsuccessul. \n", error)
        })
    }
    
    // create new admin branches
    newBranchHandler(name, contact, location) {
        Axios.post('/admin_branches', {
            name: name,
            contact: contact,
            location: location
        })
        .then(response => {
        console.log(response)
        this.getBranchesHandler();
        })
        .catch(error => {
        console.log("Data retrieval unsuccessul. \n", error)
        });
    }

    deleteBranchHandler(event){
        let url = '/admin_branches/' + event.target.dataset.id;
        Axios.delete(url)
        .then(response => {
            console.log(response);
            this.getBranchesHandler();
        })
        .catch(error => {
            console.log("Delete branches unsuccessful. \n", error)
        });
    }

    updateBranchHandler(id, obj) {
        let url = '/admin_branches/' + id;
        Axios.patch(url, obj)
        .then(response => {
            console.log(response)
            this.getBranchesHandler();
        })
        .catch(error => {
        console.log("Data update unsuccessful. \n", error)
        });
    }

    
    render() {
        if (this.state.validation && this.state.user === "admin") {
        return (
            <div>
                <p>I'm logged in as admin!</p>
                <BrowserRouter>
                        <Switch>
                            <Route exact path="/" render={props => <Branches {...props} allAdminBranches={this.state.allAdminBranches} newBranchHandler={this.newBranchHandler} deleteBranchHandler={this.deleteBranchHandler}/>} />
                            <Route path={`/branch/:branch_no`} render={props => <Branch {...props} allAdminBranches={this.state.allAdminBranches} updateBranchHandler={this.updateBranchHandler}/>} />
                        </Switch>
				</BrowserRouter>
                <button onClick={this.logoutHandler}>Logout</button>
            </div> )
        } else if (this.state.validation && this.state.user === "staff") {
            return (
                <div>
                    <p>I'm logged in as staff!</p>
                    <BrowserRouter>
                        <Switch>
                            {/* <Route exact path="/" component={Branch} />
                            <Route path="/branches" component={Branches} /> */}
                        </Switch>
				    </BrowserRouter>
                    <button onClick={this.logoutHandler}>Logout</button>
                </div> )
        } else {
            return (
                <div>
                    <h1>Adios Amigo!</h1>
                    <h3><NavLink to='/login'>Login</NavLink></h3>
                    <h3><NavLink to='/sign_up'>No account? Register here</NavLink></h3>
                </div>
            )
        }
    }
}

export default Main;