import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Table, Button, Icon } from "semantic-ui-react";

class FilteredShift extends Component {
  render() {
    console.log(this.props.allStaffShift, this.props)

    let allAdminBranches = [...this.props.allAdminBranches];
    let allShifts = this.props.allShifts;
    let filteredShifts = allShifts
    .filter(obj => {
      return obj.date === this.props.changedDate;
    })
    .map(shift => {
        let staffAllocated = 0;
        let minStaff = 0;
        let branch = allAdminBranches.filter(branch => {
          minStaff = shift.min_staff;
          // console.log(shift.id, minStaff)
          return branch.id === shift.admin_branch_id;
        });
        
        this.props.allStaffShift.forEach(staffshift => {
          if (staffshift.shift_id === shift.id) {
            staffAllocated++
          }
        
        })
        // console.log(minStaff, staffAllocated)



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
            <Table.Cell>{staffAllocated>=minStaff? (<Icon color='olive' name='check' />):(<Icon color='red' name='exclamation' />) }</Table.Cell>
          </Table.Row>
        );
      });
    

    return (
      <div>
        <Table basic selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>Branch</Table.HeaderCell>
              <Table.HeaderCell width={4}>Timing</Table.HeaderCell>
              <Table.HeaderCell width={4}>Edit</Table.HeaderCell>
              <Table.HeaderCell width={4}>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{filteredShifts}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default FilteredShift;
