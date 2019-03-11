import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon, Divider, Form, Input, Select, Header } from "semantic-ui-react";
import Calendar from "react-calendar";
import Axios from "axios";
import NavBar from "../NavBar/NavBar";
import FilteredShift from "./FilteredShift"

class Shifts extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      icon: "add",
      toggleText: "Add Shift",
      calendarToggle: false,
      filterDate: new Date(),
      filterDateLiteral: '',
      changedDate: ''
    };
    this.toggleHandler = this.toggleHandler.bind(this);
    this.toggleDivHandler = this.toggleDivHandler.bind(this);
    this.toggleCalendarHandler = this.toggleCalendarHandler.bind(this);
    this.toggleFilterCalendarHandler = this.toggleFilterCalendarHandler.bind(this);
    this.dateChanger = this.dateChanger.bind(this);
    this.newShiftHandler = this.newShiftHandler.bind(this);
    this.filteredShifts = this.filteredShifts.bind(this);
  }

  toggleHandler() {
    if (this.state.toggleText === "Add Shift") {
      this.setState({ toggleText: "Hide", icon: "angle up", toggle: true });
    } else {
      this.setState({ toggleText: "Add Shift", icon: "add", toggle: false });
    }
  }

  toggleDivHandler() {
    if (this.state.toggle) {
      return (
        <div>
          <Divider />
          <NewShift
            newShiftHandler={this.newShiftHandler}
            toggleHandler={this.toggleHandler}
            allAdminBranches={this.props.allAdminBranches}
            allShifts={this.props.allShifts}
            dateChanger={this.dateChanger}
          />
          <Divider />
        </div>
      );
    } else {
      return <div />;
    }
  }

  toggleCalendarHandler() {
    if (this.state.calendarToggle) {
        this.setState({ calendarToggle: false });
    } else {
        this.setState({ calendarToggle: true });
    }
  }

  toggleFilterCalendarHandler() {
    if (this.state.calendarToggle) {
      return (
        <div>
          <Calendar onChange={(event) => {this.toggleCalendarHandler(); this.filteredShifts(event)}} value={this.state.filterDate}/>
        </div>
      );
    } else {
      return <div />;
    }
  }

  dateChanger(dateLiteral) {
    let date = dateLiteral;
    const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12'
    };
    let month = (months[date.slice(4, 7)].slice(-2));

    let changedDate = `${parseInt(date.slice(11))}-${month}-${date.slice(8, 10)}`

    return changedDate;
  }

  newShiftHandler(obj) {
    console.log(obj)
    Axios.post("/shifts", obj)
      .then(response => {
        console.log(response);
        this.props.getShiftsHandler();
      })
      .catch(error => {
        console.log("Shift addition unsuccessul. \n", error);
      });
  }

  filteredShifts(event) {
    let dateLiteral = (event).toString().slice(0, 15);
    let changedDate = this.dateChanger(dateLiteral);
    this.setState({filterDate: event, dateLiteral: dateLiteral, changedDate: changedDate});
  }


  componentDidMount() {
    this.filteredShifts((new Date()));
  }



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
          <Button
            color="teal"
            size="small"
            onClick={this.toggleHandler}
            content={this.state.toggleText}
            icon={this.state.icon}
            labelPosition="right"
            style={{ marginBottom: "1em", verticalAlign: "top" }}
          />
          <Button
            color="blue"
            size="small"
            onClick={this.toggleCalendarHandler}
            content="Filter Dates"
            icon='calendar alternate outline'
            labelPosition="right"
            style={{ marginBottom: "1em", verticalAlign: "top" }}
          />
          {this.toggleDivHandler()}
          {this.toggleFilterCalendarHandler()}
          <Header as='h2'>
            <Icon name='calendar check' />
            <Header.Content>{this.state.dateLiteral}</Header.Content>
          </Header>
          <FilteredShift changedDate={this.state.changedDate} allShifts={this.props.allShifts} allAdminBranches={this.props.allAdminBranches}/>
        </div>
      </div>
    )
  }
}

export default Shifts;


class NewShift extends Component {
  constructor() {
    super();
    this.state = {
      time: "",
      min_staff: "",
      admin_branches_id: '',
      error: "",
      date: new Date(),
      dateLiteral: "",
      dateToggle: false,
      timeOption: [
        { text: "0700H-1300H", value: "0700H-1300H" },
        { text: "1300H-1900H", value: "1300H-1900H" },
        { text: "1900H-0100H", value: "1900H-0100H" },
        { text: "0100H-0700H", value: "0100H-0700H" }
      ],
      filteredTimeOption: [ { text: "0700H-1300H", value: "0700H-1300H" },
      { text: "1300H-1900H", value: "1300H-1900H" },
      { text: "1900H-0100H", value: "1900H-0100H" },
      { text: "0100H-0700H", value: "0100H-0700H" }]
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleDateHandler = this.toggleDateHandler.bind(this);
    this.toggleDateDiv = this.toggleDateDiv.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
    this.filterTimeHandler = this.filterTimeHandler.bind(this);
  }

  clickHandler() {
    if (!this.state.time || !this.state.min_staff || !this.state.dateLiteral || !this.state.admin_branches_id) {
      this.setState({ error: "Please do not leave any fields blank." });
    } else {
      if (this.state.min_staff < 0) {
        this.setState({ error: "Minimum employees must be more than 0." });
      } else {
        let date = this.props.dateChanger(this.state.dateLiteral);
        this.props.newShiftHandler({
          date: date,
          time: this.state.time,
          min_staff: parseInt(this.state.min_staff),
          admin_branch_id: parseInt(this.state.admin_branches_id)
        });
        this.props.toggleHandler();
      }
    }
  }

  changeHandler(event, option) {
    if (event.target.name === "min_staff") {
      let value = event.target.value;
      let name = event.target.name;

      this.setState({ [name]: value, error: "" });
    } else {
      this.setState({ [option.name]: option.value, error: "" }, this.filterTimeHandler);
    }
  }

  dateHandler(event) {
    let date = event;
    date = event.toString().slice(0, 15);
    this.setState({ date: event, dateLiteral: date, dateToggle: false });
  }

  filterTimeHandler(){
    // filters the option for time schedule creation to ensure no replicates
   let formatDate = this.props.dateChanger(this.state.dateLiteral);
   let admin_branch_id = parseInt(this.state.admin_branches_id);
   let allShifts = [...this.props.allShifts];
   let timeOption = this.state.timeOption;

   allShifts.forEach(shift => {
    //  console.log(shift.admin_branch_id, admin_branch_id, shift.date, formatDate);
     if (shift.admin_branch_id === admin_branch_id && shift.date === formatDate) {
       timeOption = timeOption.filter(obj => {
        console.log(shift, obj)
          return obj.value !== shift.time 
        });
        console.log(timeOption);
    }
   })

   this.setState({filteredTimeOption: timeOption})
  }

  toggleDateHandler() {
    if (this.state.dateToggle) {
      this.setState({ dateToggle: false });
    } else {
      this.setState({ dateToggle: true });
    }
  }

  toggleDateDiv() {
    if (this.state.dateToggle) {
      return <Calendar onChange={this.dateHandler} value={this.state.date} />;
    } else {
      return <div />;
    }
  }

  componentDidMount() {
    let date = new Date();
    date = date.toString().slice(0, 15);
    this.setState({ dateLiteral: date });
  }

  render() {
    let allBranches = this.props.allAdminBranches.map(branch => {
        return ({ text: `${branch.name}`, value: `${branch.id}`})
    })

    return (
      <div>
          <Form size="small">
          <Form.Group widths="equal">
          <Form.Field>
              <label>Date</label>
              <Input
                icon="calendar"
                value={this.state.dateLiteral}
                onFocus={this.toggleDateHandler}
                readOnly="readonly"
              />
            </Form.Field>
            {this.toggleDateDiv()}

            <Form.Field
                name="admin_branches_id"
                label="Branch"
                control={Select}
                options={allBranches}
                placeholder="Select branch"
                onChange={this.changeHandler}
              />


            <Form.Field>
              <label>Minimum Employees</label>
              <Input
                name="min_staff"
                type="number"
                onChange={this.changeHandler}
                placeholder="Minimum Employees Needed for Shift"
              />
            </Form.Field>

            <Form.Field
              name="time"
              control={Select}
              label="Time"
              options={this.state.filteredTimeOption}
              placeholder="Time"
              onChange={this.changeHandler}
            />
            

            <Form.Field
              control={Button}
              content="Add Branch"
              onClick={this.clickHandler}
              style={{ marginTop: "23px" }}
            />
            
          </Form.Group>
          <Form.Field>{this.state.error}</Form.Field>
        </Form>
      </div>
    );
  }
}



          