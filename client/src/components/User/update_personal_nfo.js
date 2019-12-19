import React, { Component } from "react";
import Formfield from "../utils/Form/formfield";
import { connect } from "react-redux";
import { updateUserData, clearUpdateUser } from '../../actions/user_actions'
import { update, generateData, isFormValid, populateFields } from "../utils/Form/formActions";

class UpdatePersonalNfo extends Component {
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
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "update_user");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "update_user");
    let formIsValid = isFormValid(this.state.formData, "update_user");

    if (formIsValid) {
      this.props.dispatch(updateUserData(dataToSubmit))
      .then(response=>{
        if(this.props.user.updateUser.success){
          this.setState({
            formSuccess: true
          },()=>{
            setTimeout(()=>{
              this.props.dispatch(clearUpdateUser())
              this.setState({
                formSuccess: false
              })
            },2000)
          })
        }
      })
    } else {
      this.setState({ formError: true });
    }
  };

  

  componentDidMount(){
    const newFormData = populateFields(this.state.formData, this.props.user.userData);
    this.setState({
      formData: newFormData
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <h2>Personal information</h2>
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
          <div>
            {
              this.state.formSuccess
              ?<div className="form_success">Success</div>
              :null
            }
            {this.state.formError ? (
              <div className="error_label">
                Por favor revise la informacion ingresada
              </div>
            ) : null}

            <button onClick={this.submitForm}>Update personal info</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UpdatePersonalNfo);
