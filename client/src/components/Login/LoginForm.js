import React, { Component } from "react";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";
import { Button, Icon, Form, Input, Radio } from "semantic-ui-react";
import NavBar from "../NavBar/NavBar";

class LoginForm extends Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.enterHandler = this.enterHandler.bind(this);
    this.state = {
      email: "",
      password: "",
      error: "",
      user: "staffs",
      doRedirect: false
    };
  }

  clickHandler(event) {
    if (!this.state.email || !this.state.password) {
      this.setState({ error: "Please do not leave any fields blank." });
    } else {
      console.log(`Sending post request to ${this.state.user}/sign_in`);
      let tempUser = this.state.user;
      tempUser = tempUser.slice(0, -1);

      axios
        .post(`/${this.state.user}/sign_in`, {
          [tempUser]: {
            email: this.state.email,
            password: this.state.password
          }
        })
        .then(response => {
          console.log(response);
          this.setState({ doRedirect: true });
        })
        .catch(error => {
          console.log(error);
          this.setState({ doRedirect: false });
          this.setState({
            error: "Invalid email or password. Please try again."
          });
        });
    }
  }

  changeHandler(event, option) {
    if (option.name !== "user") {
      let value = event.target.value;
      let name = event.target.name;

      this.setState({ [name]: value, error: "" });
    } else {
      this.setState({ user: option.value });
    }
  }

  enterHandler(event) {
    if (event.keyCode === 13 && this.state.email && this.state.password) {
      this.clickHandler();
    }
  }

  render() {
    const divBody = {
        margin: "2em 2em"
      };

    if (this.state.doRedirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
        <NavBar/>
        <div style={divBody}>
          <Button color="grey" size="small" animated as={NavLink} to="/" style={{marginBottom: '2vh'}}>
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="angle left" />
            </Button.Content>
          </Button>
          <Form className="landingpagecentre">
            <Form.Group>
              <Form.Field
                control={Input}
                name="email"
                label="Email"
                placeholder="Email"
                onChange={this.changeHandler}
              />
              <Form.Field
                control={Input}
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                onChange={this.changeHandler}
              />
            <Form.Field onClick={this.clickHandler} control={Button} style={{marginTop: '23px'}}>
              Submit
            </Form.Field>
            </Form.Group>

            <Form.Group inline>
              <label>Type</label>
              <Form.Field
                control={Radio}
                name="user"
                label="Staff"
                value="staffs"
                checked={this.state.user === "staffs"}
                onChange={this.changeHandler}
              />
              <Form.Field
                control={Radio}
                name="user"
                label="Admin"
                value="admins"
                checked={this.state.user === "admins"}
                onChange={this.changeHandler}
              />
            </Form.Group>
              <p>{this.state.error}</p>
          </Form>
        </div>
        </div>
      );
    }
  }
}

export default LoginForm;
