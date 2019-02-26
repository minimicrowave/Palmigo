import React, { Component } from 'react';
import './App.css';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import StaffOrAdminSignUp from './components/SignUp/StaffOrAdminSignUp';
import Main from './components/Main/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h3>Hello, I'm just a placeholder.</h3>
        <BrowserRouter>
					<Switch>
						<Route exact path="/login" component={LoginForm} />
						<Route exact path="/sign_up" component={StaffOrAdminSignUp} />
						<Route path="/" component={Main} />
					</Switch>
				</BrowserRouter>
      </div>
    );
  }
// }
}

export default App;
