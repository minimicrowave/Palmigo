import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Button, Icon, Form } from "semantic-ui-react";
import NavBar from "../NavBar/NavBar";

class Branch extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      contact: "",
      location: "",
      redirect: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    let value = event.target.value;
    let name = event.target.name;

    this.setState({ [name]: value, error: "" });
  }

  submitHandler(id) {
    if (!this.state.name || !this.state.contact || !this.state.location) {
      this.setState({ error: "Please do not leave any fields blank." });
    } else {
      this.setState({ redirect: true });
      this.props.updateBranchHandler(id, {
        name: this.state.name,
        contact: this.state.contact,
        location: this.state.location
      });
    }
  }

  componentDidMount() {
    let branchNo = this.props.match.params.branch_no;
    let branch = [...this.props.allAdminBranches].find(element => {
      return element.id === parseInt(branchNo);
    });
    if (branch) {
      this.setState({
        name: branch.name,
        contact: branch.contact,
        location: branch.location
      });
    }
  }

  render() {
    let id = this.props.match.params.branch_no;
    let branch = [...this.props.allAdminBranches].find(element => {
      return element.id === parseInt(id);
    });

    const divBody = {
      margin: "2em 2em"
    };

    if (branch) {
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
              style={{marginBottom: "1em"}}
            >
              <Button.Content visible>Back</Button.Content>
              <Button.Content hidden>
                <Icon name="angle left" />
              </Button.Content>
            </Button>

            <Form>
                <Form.Field>
                <label>Branch</label>
                <input
                 name="name"
                 defaultValue={branch.name}
                 onChange={this.changeHandler}
                />
                </Form.Field>
                <Form.Field>
                <label>Contact No.</label>
                <input
                name="contact"
                type="number"
                defaultValue={branch.contact}
                onChange={this.changeHandler}
                />
                </Form.Field>
                <Form.Field>
                <label>Location.</label>
                <input
                name="location"
                defaultValue={branch.location}
                onChange={this.changeHandler}
                />
                </Form.Field>
            </Form>
            <p>{this.state.error}</p>
           
            <Button color="blue"
              onClick={() => {
                this.submitHandler(branch.id);
              }}
            >
              Update Branch
            </Button>
            {this.state.redirect ? <Redirect to="/" /> : null}
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Branch;
