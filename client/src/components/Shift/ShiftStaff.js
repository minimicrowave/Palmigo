import React, {Component} from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Table, Button, Icon} from "semantic-ui-react";

class ShiftStaff extends Component {
    render() {
        return(
            <div>
                 <Button
                   color="grey"
                   size="small"
                   animated
                   as={NavLink}
                   to="/shifts"
                   style={{ marginBottom: "1em" }}
                 >
                   <Button.Content visible>Back</Button.Content>
                   <Button.Content hidden>
                     <Icon name="angle left" />
                   </Button.Content>
                 </Button>
            
                 ShiftStaff
            </div>
        )
    }
}

export default ShiftStaff;