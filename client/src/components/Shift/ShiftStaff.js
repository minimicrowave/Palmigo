import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Header, Button, Icon, List, Segment } from "semantic-ui-react";
import NavBar from "../NavBar/NavBar";
import StaffEdit from "../Staff/StaffEdit";

class ShiftStaff extends Component {
  constructor(props) {
    super();
    this.state = {
      allShifts: props.allShifts,
      allStaff: props.allStaff,
      reload: false,
    };
    this.reload = this.reload.bind(this);
  }

  reload(){
    this.setState({reload: true});
  }

  render() {
    const divBody = {
      margin: "2em 2em"
    };

    if (
      this.props.allShifts.length > 0 &&
      this.props.allStaff.length > 0 &&
      this.props.allAdminBranches.length > 0
    ) {
      // find current shift;
      let id = parseInt(this.props.match.params.id);
      let currentShift = this.props.allShifts.find(shift => {
        return shift.id === id;
      });

      // get all staff fromt current day's shifts
      let currentDayShiftsIds = this.props.allShifts
        .filter(shift => {
          return currentShift.date === shift.date;
        })
        .map(shift => {
          return shift.id;
        });

      let branchName = this.props.allAdminBranches.find(branch => {
        return branch.id === currentShift.admin_branch_id;
      });

      let branchStaff = this.props.allStaff.filter(staff => {
        return staff.admin_branch_id === currentShift.admin_branch_id;
      });

      console.log(
        currentShift,
        currentDayShiftsIds,
        this.props.allStaffShift,
        this.props
      );

      let alreadyScheduledStaff = this.props.allStaffShift
        .filter(staff => {
          return currentDayShiftsIds.includes(staff.shift_id);
        })
        .map(staff => {
          return staff.staff_detail_id;
        });

      let availableStaff = branchStaff.filter(staff => {
        console.log(staff);
        return !alreadyScheduledStaff.includes(staff.id);
      });

      let scheduledStaffArr = [];
      let scheduledStaff = this.props.allStaffShift
        .filter(staff => {
          return staff.shift_id === currentShift.id;
        })
        .map(shift => {
          scheduledStaffArr.push(shift.staff_detail_id);
          let name = this.props.allStaff.find(staff => {
            return staff.id === shift.staff_detail_id;
          });
          return (
            <List.Item>
              <Icon name="check circle" />
              {name.name}
            </List.Item>
          );
        });

      console.log(scheduledStaffArr);

      return (
        <div>
        {(this.state.reload)? (this.forceUpdate()):null}
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
            <Segment.Group horizontal>
              <Segment>{branchName.name}</Segment>
              <Segment>{currentShift.date}</Segment>
              <Segment>{currentShift.time}</Segment>
              <Segment>Minimum {currentShift.min_staff} staff needed</Segment>
            </Segment.Group>

            <StaffEdit
              availableStaff={availableStaff}
              scheduledStaff={scheduledStaff}
              id={id}
              getShiftsHandler={this.props.getShiftsHandler}
              getStaffShiftHandler={this.props.getStaffShiftHandler}
              getBranchesHandler={this.props.getBranchesHandler}
              reload={this.reload}
            />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/shifts" />;
    }
  }
}

export default ShiftStaff;
