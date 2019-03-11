import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Icon, Button, Header, Form } from "semantic-ui-react";

class LoginForm extends Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.enterHandler = this.enterHandler.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      doRedirect: false
    };
  }

  clickHandler() {
    if (!this.state.email || !this.state.password) {
      this.setState({ error: "Please do not leave any fields blank." });
    } else {
      console.log(`Sending post request to ${this.props.user}`);
      let tempUser = this.props.user;
      tempUser = tempUser.slice(0, -1).toLowerCase();

      var params;
      if (this.props.user === "Staffs") {
        params = {
          email: this.state.email,
          password: this.state.password
        };
      } else {
        params = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        };
      }

      axios
        .post(`/${this.props.user.toLowerCase()}`, { [tempUser]: params })
        .then(response => {
          console.log(response);
          axios
            .post(`/${this.props.user.toLowerCase()}/sign_in`, {
              [tempUser]: {
                email: this.state.email,
                password: this.state.password
              }
            })
            .then(response => {
              console.log(response);
              this.setState({ doRedirect: true });
            });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            error: "Email unavailable. Please try again.",
            doRedirect: false
          });
        });
    }
  }

  changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({ [name]: value, error: "" });
  }

  enterHandler(event) {
    if (event.keyCode === 13 && this.state.email && this.state.password) {
      this.clickHandler();
    }
  }

  render() {
    if (this.state.doRedirect) {
      return <Redirect to="/" />;
    } else {
      if (this.props.user !== "") {
        return (
          <div>
            <Header as="h2">
              <Icon name="write" />
              <Header.Content>
                {this.props.user.slice(0, -1)} Sign Up
              </Header.Content>
            </Header>
            <Form>
              <Form.Group>
              {this.props.user === "Admins" && (
               <Form.Field>
               <label>Company Name</label>
               <input name="name" onChange={this.changeHandler} required />
             </Form.Field>
            )}
                <Form.Field>
                  <label>Email</label>
                  <input name="email" onChange={this.changeHandler} required />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                name="password"
                type="password"
                onChange={this.changeHandler}
                onKeyUp={this.enterHandler}
                required
              />
                </Form.Field>
                <Form.Field>
                  <Button onClick={this.clickHandler} style={{marginTop: '23px'}}>Submit</Button>
                </Form.Field>
              </Form.Group>
            </Form>
            <p>{this.state.error}</p>
          </div>
        );
      } else {
        return <div />;
      }
    }
  }
}

export default LoginForm;
