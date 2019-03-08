import React, { Component } from "react";
import { NavLink, Redirect} from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import NavBar from "../NavBar/NavBar";

class Shifts extends Component {
  render() {
    const divBody = {
      margin: "2em 2em"
    };

    return (
      <div>
        <NavBar />
        <div style={divBody}>
          <Button
            color="grey"
            size="small"
            animated
            as={NavLink}
            to="/"
            style={{ marginBottom: "1em" }}
          >
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="angle left" />
            </Button.Content>
          </Button>
          SHIFTZ
        </div>
      </div>
    );
  }
}

export default Shifts;
