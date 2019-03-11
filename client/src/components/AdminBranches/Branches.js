import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Clock from "react-digital-clock";
import HeaderPhoto from "../../splashpicture.png";
import {
  Container,
  Header,
  Menu,
  Visibility,
  Icon,
  Button,
  Grid,
  Image,
  Modal,
  List,
  Divider,
  Form,
  Input
} from "semantic-ui-react";

class Branches extends Component {
  constructor() {
    super();
    this.state = {
      allAdminBranches: [],
      data: [],
      toggle: false,
      icon: "add",
      toggleText: "Add Branch",
      menuFixed: false,
      overlayFixed: false
    };
    this.toggleHandler = this.toggleHandler.bind(this);
    this.toggleDivHandler = this.toggleDivHandler.bind(this);
    this.addBranchButtonHandler = this.addBranchButtonHandler.bind(this);
  }

  addBranchButtonHandler() {
    window.scrollTo(0, 200);
    this.toggleHandler();
  }

  toggleHandler() {
    if (this.state.toggleText === "Add Branch") {
      this.setState({ toggleText: "Hide", icon: "angle up", toggle: true });
    } else {
      this.setState({ toggleText: "Add Branch", icon: "add", toggle: false });
    }
  }

  toggleDivHandler() {
    if (this.state.toggle) {
      return (
        <div>
          <Divider />
          <NewBranch
            newBranchHandler={this.props.newBranchHandler}
            toggleHandler={this.toggleHandler}
          />
          <Divider />
        </div>
      );
    } else {
      return <div />;
    }
  }

  date() {
    let today = this.props.todaysDate;
    return (<p style={{color: 'white'}}>{today}</p>);
  }

  stickOverlay = () => this.setState({ overlayFixed: true });
  stickTopMenu = () => this.setState({ menuFixed: true });
  unStickOverlay = () => this.setState({ overlayFixed: false });
  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {

    let todaysShift = [...this.props.allShifts]
    todaysShift = todaysShift.filter(shift => {
        return shift.date === this.props.todaysDate
    })

    console.log(todaysShift);

    let branches = [...this.props.allAdminBranches];
    branches = branches.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    let eachBranch = branches.map((branch, index) => {
      return (
        <Grid.Row>
          <Grid.Column width={4}>
            <Header as="h3">
              <Icon name="building outline" size="big" />
              {branch.name}
            </Header>
            {/* <p>Branch ID: {branch.id}</p> */}
            <List>
              <List.Item icon="call" content={branch.contact} />
              <List.Item icon="map pin" content={branch.location} />
            </List>
            <Button
              circular
              header
              as={NavLink}
              to={{ pathname: `branch/${branch.id}` }}
              size="small"
              color="olive"
              icon="edit outline"
            />
            <Modal
              trigger={
                <Button
                  circular
                  size="small"
                  color="red"
                  icon="trash alternate outline"
                />
              }
              basic
              size="small"
              closeIcon
            >
              <Header icon="trash" content="Delete Branch" />
              <Modal.Content>
                <p>Are you sure you want to delete {branch.location}?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  basic
                  color="red"
                  inverted
                  data-id={branch.id}
                  onClick={event => this.props.deleteBranchHandler(event)}
                >
                  <Icon name="trash alternate outline" /> Delete
                </Button>
              </Modal.Actions>
            </Modal>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid celled="internally">
              <Grid.Row>
                <Grid.Column width={2}>
                  <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
                </Grid.Column>
                <Grid.Column width={14}>
                  <Grid columns="three" divided>
                    <Grid.Row>
                      <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      </Grid.Column>
                      <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      </Grid.Column>
                      <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                      <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      </Grid.Column>
                      <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      </Grid.Column>
                      <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
                </Grid.Column>
                <Grid.Column width={14}>
                  <Grid columns="three" divided>
                    <Grid.Row>
                      <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      </Grid.Column>
                      <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      </Grid.Column>
                      <Grid.Column>
                        <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                      </Grid.Column>
                    </Grid.Row>

    
                  </Grid>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      );
    });

    
    const { menuFixed, overlayFixed } = this.state;

    const menuStyle = {
      border: "none",
      borderRadius: 0,
      boxShadow: "none",
      marginBottom: "1em",
      transition: "box-shadow 0.5s ease, padding 0.5s ease",
      backgroundColor: "#b2d8d8"
    };

    const fixedMenuStyle = {
      backgroundColor: "#b2d8d8",
      border: "1px solid #ddd",
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"
    };

    const overlayStyle = {
      float: "left",
      margin: "0em 3em 1em 0em"
    };

    const fixedOverlayStyle = {
      ...overlayStyle,
      position: "fixed",
      top: "80px",
      zIndex: 10
    };

    const overlayMenuStyle = {
      position: "relative",
      left: 0,
      transition: "left 0.5s ease"
    };

    const fixedOverlayMenuStyle = {
      ...overlayMenuStyle,
      left: "800px"
    };

    const HeaderPhotoStyle = {
      width: "100%"
    };

    const divBody = {
      margin: "0 2%"
    };

    return (
      <div>
        <div>
          <img src={HeaderPhoto} style={HeaderPhotoStyle} />
        </div>

        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed ? "top" : undefined}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container>
              <Menu.Item>
                <Icon name="home" size="large" />
              </Menu.Item>
              <Menu.Item header>Hello, {this.props.name}</Menu.Item>
              <Menu.Item as="a" onClick={this.addBranchButtonHandler}>
                Add Branch
              </Menu.Item>
              <Menu.Item header
              as={NavLink}
              to={{ pathname: `/shifts` }}>All Shifts</Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item>{this.date()}</Menu.Item>
                <Menu.Item>
                  <Clock hour12={false} />
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>

        <div style={divBody}>
          <h1>Schedule</h1>
          <Button
            color="teal"
            size="small"
            onClick={this.toggleHandler}
            content={this.state.toggleText}
            icon={this.state.icon}
            labelPosition="right"
          />
          {this.toggleDivHandler()}
          <Grid celled="internally">{eachBranch}</Grid>
        </div>
      </div>
    );
  }
}







class NewBranch extends Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      branchName: "",
      contactNo: "",
      location: "",
      error: ""
    };
  }

  clickHandler() {
    if (
      !this.state.branchName ||
      !this.state.contactNo ||
      !this.state.location
    ) {
      this.setState({ error: "Please do not leave any fields blank." });
    } else {
      this.props.newBranchHandler(
        this.state.branchName,
        this.state.contactNo,
        this.state.location
      );
      this.props.toggleHandler();
    }
  }

  changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({ [name]: value, error: "" });
  }

  render() {
    return (
      <div>
        <Form size="small">
          <Form.Group widths="equal">
            <Form.Field inline>
              <label>Branch Name</label>
              <Input
                name="branchName"
                onChange={this.changeHandler}
                placeholder="Myrtle Mini"
              />
            </Form.Field>

            <Form.Field inline>
              <label>Contact No.</label>
              <Input
                name="contactNo"
                type="number"
                onChange={this.changeHandler}
                placeholder="+65 6123 4567"
              />
            </Form.Field>

            <Form.Field inline>
              <label>Branch Name</label>
              <Input
                name="location"
                onChange={this.changeHandler}
                placeholder="Grand Lane 5"
              />
            </Form.Field>

            <Form.Field
              control={Button}
              content="Add Branch"
              onClick={this.clickHandler}
            />
          </Form.Group>
          <Form.Field>{this.state.error}</Form.Field>
        </Form>
      </div>
    );
  }
}
export default Branches;
