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
            user: props.user
          };
        this.logoutHandler = this.logoutHandler.bind(this);
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
    }
      
    render() {
        
        if (this.state.validation && this.state.user === "admin") {
        return (
            <div>
                <p>I'm logged in as admin!</p>
                <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Branches} />
                            <Route path={`/branch/:branch_no`} component={Branch} />
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