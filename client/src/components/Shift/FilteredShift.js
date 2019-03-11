import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";

class FilteredShift extends Component {
  render() {
    let allAdminBranches = [...this.props.allAdminBranches];
    let allShifts = this.props.allShifts;
    let filteredShifts = allShifts
      .filter(obj => {
        return obj.date === this.props.changedDate;
      })
      .map(shift => {
        let branch = allAdminBranches.filter(branch => {
          return branch.id === shift.admin_branch_id;
        });
        return (
          <Table.Row>
            <Table.Cell>{branch[0].name}</Table.Cell>
            <Table.Cell>{shift.time}</Table.Cell>
            <Table.Cell><Button
              circular
              header
              as={NavLink}
              to={{ pathname: `/shifts/${shift.id}` }}
              size="small"
              color="olive"
              icon="edit outline"
            /></Table.Cell>
          </Table.Row>
        );
      });

    return (
      <div>
        <Table basic selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>Branch</Table.HeaderCell>
              <Table.HeaderCell width={5}>Timing</Table.HeaderCell>
              <Table.HeaderCell width={5}>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{filteredShifts}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default FilteredShift;
