import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserData, clearUpdateUser } from "../../actions/user_actions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

class UpdatePersonalNfo extends Component {
  state = {
    name: "",
    lastName: "",
    email: "",
    formError: false,
    updateSuccess: false,
    errorMsg: ""
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.email.length > 0
    );
  }

  submitForm = event => {
    event.preventDefault();

    const dataToSubmit = {
      name: this.state.name.trim(),
      lastname: this.state.lastName.trim(),
      email: this.state.email.trim()
    };

    //validate data
    const nameExist = dataToSubmit.name !== "";
    const lastNameExist = dataToSubmit.lastname !== "";
    const emailExist = dataToSubmit.email !== "";
    const emailIsValid = /\S+@\S+\.\S+/.test(dataToSubmit.email);

    //submit data with dispatch updateUserData

    if (nameExist && lastNameExist && emailExist && emailIsValid) {
      this.props.dispatch(updateUserData(dataToSubmit)).then(response => {
        if (this.props.user.updateUser.success) {
          this.setState(
            {
              updateSuccess: true
            },
            () => {
              setTimeout(() => {
                this.props.dispatch(clearUpdateUser());
                this.setState({
                  updateSuccess: false
                });
              }, 2000);
            }
          );
        }
      });
    } else {
      this.setState({
        formError: true,
        errorMsg: "Please check the information and try again"
      });
      setTimeout(() => {
        this.setState({
          formError: false,
          errMsg: ""
        });
      }, 5000);
    }
  };

  componentDidMount() {
    const { email, name, lastname } = this.props.user.userData;

    this.setState({
      name,
      email,
      lastName: lastname
    });
  }

  render() {
    return (
      <Container>
        <Form
          style={{
            margin: "0 auto",
            maxWidth: "320px"
          }}
          onSubmit={this.submitForm}
        >
          <h3 className="text-center">Update User</h3>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={this.state.name}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={this.state.lastName}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </Form.Group>
          {this.state.updateSuccess && (
            <Alert variant="success">
              <span>Successful update</span>
            </Alert>
          )}
          {this.state.formError && (
            <Alert variant="danger">{this.state.errorMsg}</Alert>
          )}
          <Button
            block
            variant={!this.validateForm() ? "dark" : "primary"}
            type="submit"
          >
            Update
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UpdatePersonalNfo);
