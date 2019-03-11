import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";
import SignUpForm from "./SignUpForm";
import NavBar from "../NavBar/NavBar";

class StaffOrAdminSignUp extends Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      user: ""
    };
  }

  clickHandler(event) {
    this.setState({ user: event.target.dataset.id });
  }

  render() {
    const divBody = {
        margin: "2em 2em"
      };

    const button = {
        position: 'relative',
        top: '-7px'
    }
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
        
          <Button.Group size='small' style={button}>
              <Button
              header
              data-id="Staffs" onClick={this.clickHandler}
              size="small"
              color="white"
            >I'm a Staff member.</Button>
             <Button.Or />
              <Button
              header
              data-id="Admins" onClick={this.clickHandler}
              size="small"
              color="white"
            >I'm a Company administrator.</Button>
            </Button.Group>
          <SignUpForm user={this.state.user} />
          <h4>
          </h4>
        </div>
      </div>
    );
  }
}

export default StaffOrAdminSignUp;
