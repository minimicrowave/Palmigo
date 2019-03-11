import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Header, Button, Icon, Table } from "semantic-ui-react";
import NavBar from "../NavBar/NavBar";

class ShiftStaff extends Component {
  constructor(props) {
    super();
    this.state = {
      allShifts: props.allShifts,
      allStaff: props.allStaff
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allShifts: nextProps.allShifts,
      allStaff: nextProps.allStaff
    });
  }

  render() {
    let id = parseInt(this.props.match.params.id);
    let currentShift = this.props.allShifts.find(shift => {
      return shift.id === id;
    });
    let currentDayShifts = this.props.allShifts.filter(shift => {
      return currentShift.date === shift.date;
    });
    console.log(currentShift, currentDayShifts);

    const divBody = {
      margin: "2em 2em"
    };
    if (this.props.allShifts && this.props.allStaff) {
      return (
        <div>
          <NavBar />
          <div style={divBody}>
            <Button
              color="grey"
              size="small"
              animated
              as={NavLink}
              to="/shifts"
            >
              <Button.Content visible>Back</Button.Content>
              <Button.Content hidden>
                <Icon name="angle left" />
              </Button.Content>
            </Button>
            <Header as="h2">
              <Icon name="pencil" />
              <Header.Content>Edit Shift</Header.Content>
            </Header>

            <div style={{width: '60%', display: 'inline-block'}}>
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={8}>Name</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>John</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <div style={{width: '38%', marginLeft: '2%', display: 'inline-block'}}>
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={8}>Name</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>John</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/shifts" />;
    }
  }
}

export default ShiftStaff;
