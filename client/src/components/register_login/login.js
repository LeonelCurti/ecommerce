import React, { Component } from "react";
import { connect } from "react-redux";
import Formfield from '../utils/Form/formfield';

class Login extends Component {

  state = {
    formError: false,
    formSuccess:'',
    formData: {
      email: {
        element: 'input',
        value:'',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder:'Ingrese su email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value:'',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder:'Ingrese su password'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
    }
  }

  updateForm = ()=>{

  }

  submitForm = event => {

  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={e => this.submitForm(e)}>
          <Formfield 
            id={'email'}
            formdata={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
        </form>
      </div>
    );
  }
}

export default connect()(Login);
