import React, { Component } from "react";
import Formfield from "../utils/Form/formfield";
import { update, generateData, isFormValid } from "../utils/Form/formActions";
import Dialog from '@material-ui/core/Dialog';

import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Ingrese su nombre"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Ingrese su apellido"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
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
          placeholder: "Ingrese su contraseña"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirme su contraseña"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "register");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "register");
    let formIsValid = isFormValid(this.state.formData, "register");

    if (formIsValid) {
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then(response => {
          if (response.payload.success) {
            this.setState({
              formError: false,
              formSuccess: true
            });
            setTimeout(()=>{
              this.props.history.push('/register_login')
            },3000) 
          } else {
            this.setState({ formError: true });
          }
        })
        .catch(err => {          
          this.setState({ formError: true });
        });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={this.submitForm}>
                <h2>Informacion personal</h2>
                <div className="form_block_two">
                  <div className="block">
                    <Formfield
                      id={"name"}
                      formdata={this.state.formData.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <Formfield
                      id={"lastname"}
                      formdata={this.state.formData.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <Formfield
                    id={"email"}
                    formdata={this.state.formData.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Verificar contraseña</h2>
                <div className="form_block_two">
                  <div className="block">
                    <Formfield
                      id={"password"}
                      formdata={this.state.formData.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <Formfield
                      id={"confirmPassword"}
                      formdata={this.state.formData.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  {this.state.formError ? (
                    <div className="error_label">
                      Por favor revise la informacion ingresada
                    </div>
                  ) : null}

                  <button onClick={this.submitForm}>Crear cuenta</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Felicitaciones</div>
            <div>
              Seras redirigido al Login en unos segundos!
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
