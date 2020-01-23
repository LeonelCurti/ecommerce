import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

class Register extends Component {
  state = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    formError: false,
    registerSuccess: false,
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
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  submitForm = e => {
    e.preventDefault();

    const dataToSubmit = {
      name: this.state.name.trim(),
      lastname: this.state.lastName.trim(),
      email: this.state.email.trim(),
      password: this.state.password
    };

    //validate data
    const nameExist = dataToSubmit.name !== "";
    const lastNameExist = dataToSubmit.lastname !== "";
    const emailExist = dataToSubmit.email !== "";
    const passwordExist = dataToSubmit.password !== "";
    const passwordlenght = dataToSubmit.password.length > 4;
    const emailIsValid = /\S+@\S+\.\S+/.test(dataToSubmit.email);

    //submit data with dispatch registerUser
    if (
      nameExist &&
      lastNameExist &&
      emailExist &&
      passwordExist &&
      passwordlenght &&
      emailIsValid
    ) {
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then(response => {
          if (response.payload.success) {
            this.setState({
              registerSuccess: true
            });
            setTimeout(() => {
              this.props.history.push("/login");
            }, 4000);
          } else {
            this.setState({
              formError: true,
              errorMsg: response.payload.err
            });
            setTimeout(() => {
              this.setState({
                formError: false,
                errorMsg: ""
              });
            }, 5000);
          }
        })
        .catch(err => {
          this.setState({
            formError: true,
            errorMsg: "Ha ocurrido un error, vuelva a intentarlo"
          });
          setTimeout(() => {
            this.setState({
              formError: false,
              errorMsg: ""
            });
          }, 5000);
        });
    } else {
      this.setState({
        formError: true,
        errorMsg: "Revise la informacion ingresada y vuelva a intentar"
      });
      setTimeout(() => {
        this.setState({
          formError: false,
          errMsg: ""
        });
      }, 5000);
    }
  };

  render() {
    return (
      <Container>
        <div
          style={{
            padding: "4.5rem 0"
          }}
        >
          <Form
            style={{
              margin: "0 auto",
              maxWidth: "320px"
            }}
            onSubmit={this.submitForm}
            >
            <h2 className="text-center">Register</h2>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                // autoFocus
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
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                value={this.state.password}
                onChange={this.onChange}
                type="password"
              />
              <Form.Text className="text-muted">
                Password must be 5 or more characters.                
              </Form.Text>
            </Form.Group>
            {this.state.registerSuccess && (
              <Alert variant="success">
                <Spinner
                  style={{ marginRight: "10px" }}
                  animation="border"
                  variant="success"
                />
                <span>Redirect to login</span>
              </Alert>
            )}
            {this.state.formError && (
              <Alert variant="danger">{this.state.errorMsg}</Alert>
            )}            
            <Button
              block
              variant={!this.validateForm() ? "dark" : "primary"}
              // disabled={!this.validateForm()}
              type="submit"
            >
              Register
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

export default connect()(Register);
