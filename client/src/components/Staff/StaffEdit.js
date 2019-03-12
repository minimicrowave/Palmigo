import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Header, Button, Icon, Table, List, Segment } from "semantic-ui-react";
import Axios from 'axios';

class StaffEdit extends Component {
  constructor() {
    super();
    this.state = {
      availableStaff: [],
      selectedStaff: [],
      availableList: [],
      selectedList: [],
      redirect: false
    };
    this.addToSchedule = this.addToSchedule.bind(this);
    this.removeFromSchedule = this.removeFromSchedule.bind(this);
    this.printAvailableList = this.printAvailableList.bind(this);
    this.printSelectedList = this.printSelectedList.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.createStaffShift = this.createStaffShift.bind(this);
  }

  addToSchedule(event, option) {
    let availableStaff = this.state.availableStaff;
    let selectedStaff = this.state.selectedStaff;
    let selected = availableStaff.find(staff => {
      return staff.id === parseInt(option["data-id"]);
    });
    selectedStaff.push(selected);
    var index = availableStaff.indexOf(selected);
    if (index > -1) {
      availableStaff.splice(index, 1);
    }

    this.setState({
      selectedStaff: selectedStaff,
      availableStaff: availableStaff
    });
    this.printSelectedList();
    this.printAvailableList();
  }

  removeFromSchedule(event, option) {
    let availableStaff = this.state.availableStaff;
    let selectedStaff = this.state.selectedStaff;
    let selected = selectedStaff.find(staff => {
      return staff.id === parseInt(option["data-id"]);
    });
    availableStaff.push(selected);
    var index = selectedStaff.indexOf(selected);
    if (index > -1) {
      selectedStaff.splice(index, 1);
    }

    this.setState({
      selectedStaff: selectedStaff,
      availableStaff: availableStaff
    });
    this.printSelectedList();
    this.printAvailableList();
  }

  printSelectedList() {
    let selectedStaff = this.state.selectedStaff;
    if (selectedStaff.length > 0) {
      selectedStaff = selectedStaff.map(staff => {
        return (
          <List.Item>
            <Icon
              color="red"
              name="minus"
              data-id={staff.id}
              onClick={this.removeFromSchedule}
            />
            {staff.name}
          </List.Item>
        );
      });
      this.setState({ selectedList: selectedStaff });
    } else {
      this.setState({ selectedList: <div /> });
    }
  }

  printAvailableList() {
    let availableStaff = this.state.availableStaff;
    if (availableStaff.length > 0) {
      availableStaff = availableStaff.map(staff => {
        return (
          <List.Item>
            <Icon
              color="green"
              name="add"
              data-id={staff.id}
              onClick={this.addToSchedule}
            />
            {staff.name}
          </List.Item>
        );
      });
      this.setState({ availableList: availableStaff });
    } else {
      this.setState({ availableList: <div /> });
    }
  }

  submitHandler() {
    if (this.state.selectedStaff.length > 0) {
          let selectedStaff = this.state.selectedStaff;
          selectedStaff.map(staff => {
            console.log(staff.id, this.props.id);
            this.createStaffShift({
              staff_detail_id: staff.id,
              shift_id: this.props.id
            })
          })
    } else {
        this.setState({redirect: true})
    }
  }

  createStaffShift(obj){
    let url = "/admin/staffshift";
    Axios.patch(url, obj)
      .then(response => {
        console.log(response);
        // this.getBranchesHandler();
      })
      .catch(error => {
        console.log("Create staff shift unsuccessful. \n", error);
      });
  }

  componentDidMount() {
    console.log(this.props.availableStaff);
    this.setState(
      { availableStaff: this.props.availableStaff },
      this.printAvailableList
    );
  }

  render() {
    console.log(this.props.availableStaff, this.state);
    if (!this.state.redirect) {
      return (
        <div>
          <div style={{ width: "60%", display: "inline-block" }}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={8}>Scheduled Staff</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <List>
                      {this.props.scheduledStaff}
                      {this.state.selectedList}
                    </List>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <div
            style={{
              width: "38%",
              marginLeft: "2%",
              display: "inline-block",
              verticalAlign: "top"
            }}
          >
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={8}>Available Staff</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <List>{this.state.availableList}</List>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <Button
            onClick={this.submitHandler}
            color="green"
            content="Save"
            icon="save"
            float="right"
            labelPosition="right"
          />
        </div>
      );
    } else {
      return <Redirect to="/shifts" />;
    }
  }
}

export default StaffEdit;
