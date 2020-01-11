import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

class Login extends Component {
  state = {
    email: "",
    password: "",
    formError: false,
    errorMsg: ""
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const dataToSubmit = {
      email: this.state.email.trim(),
      password: this.state.password
    };

    //validate data
    const emailExist = dataToSubmit.email !== "";
    const passwordExist = dataToSubmit.password !== "";
    const emailIsValid = /\S+@\S+\.\S+/.test(dataToSubmit.email);

    //submit data with dispatch loginUser
    if (emailExist && passwordExist && emailIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          this.props.history.push("/user/dashboard");
        } else {
          this.setState({
            formError: true
          });
          setTimeout(() => {
            this.setState({ formError: false });
          }, 4000);
        }
      });
    } else {
      this.setState({ formError: true });
      setTimeout(() => {
        this.setState({ formError: false });
      }, 4000);
    }
  };

  render() {
    return (
      <Container>
        <div
          style={{
            padding: "60px 0"
          }}
        >
          <Form
            style={{
              margin: "0 auto",
              maxWidth: "320px"
            }}
            onSubmit={this.submitForm}
          >
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
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
            </Form.Group>
            {this.state.formError && (
              <Alert variant="danger">
                Por favor revise la informacion ingresada
              </Alert>
            )}
            <Button              
              block
              // variant="dark"
              variant={!this.validateForm()? 'dark': 'primary'}
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}
export default connect()(withRouter(Login));
