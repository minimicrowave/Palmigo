import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Table, Button, Icon } from "semantic-ui-react";
import NavBar from "../NavBar/NavBar";

class ShiftStaff extends Component {
  render() {
    console.log(this.props);
    console.log();

    const divBody = {
      margin: "2em 2em"
    };

    return (
      <div>
        <NavBar />
        <div style={divBody}>
          <Button color="grey" size="small" animated as={NavLink} to="/shifts">
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="angle left" />
            </Button.Content>
          </Button>
          ShiftStaff
        </div>
      </div>
    );
  }
}

export default ShiftStaff;
