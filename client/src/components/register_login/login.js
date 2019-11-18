import React, { Component } from "react";
import Formfield from "../utils/Form/formfield";
import { update, generateData, isFormValid } from "../utils/Form/formActions";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";

class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Ingrese su email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Ingrese su password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "login");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "login");
    let formIsValid = isFormValid(this.state.formData, "login");

    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          console.log(response.payload);
          this.props.history.push("/user/dashboard");
        } else {
          this.setState({
            formError: true
          });
        }
      });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={e => this.submitForm(e)}>
          <Formfield
            id={"email"}
            formdata={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          <Formfield
            id={"password"}
            formdata={this.state.formData.password}
            change={element => this.updateForm(element)}
          />

          {this.state.formError ? (
            <div className="error_label">
              Por favor revisar la informacion ingresada
            </div>
          ) : null}

          <button onClick={e => this.submitForm(e)}>LOG IN</button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
