import React, { Component } from 'react'
import Formfield from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../utils/Form/formActions";
import { getWoods ,addWood } from "../../../actions/product_actions";
import { connect } from "react-redux";

class ManageWoods extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "wood_input",
          type: "text",
          placeholder: "Enter the wood"
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

  showCategoryItems = () => (
    this.props.products.woods
      ? this.props.products.woods.map((item, i) => (
          <div className="category_item" key={i}>
            {item.name}
          </div>
        ))
      : null
  )

  componentDidMount() {
    this.props.dispatch(getWoods());
  }

  resetFieldsHandler = () =>{
    const newFormData = resetFields(this.state.formData, "woods")
    this.setState({
      formData: newFormData,
      formSuccess: true
    })
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "woods");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "woods");
    let formIsValid = isFormValid(this.state.formData, "woods");
    let existingWoods = this.props.products.woods

    if (formIsValid) {
     this.props.dispatch(addWood(dataToSubmit,existingWoods))
     .then((response)=>{
      if(response.payload.success){
        this.resetFieldsHandler()
      }else {
        this.setState({formError:true})
      }
     })
            
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}
            </div>
          </div>
          <div className="right">
            <form onSubmit={e => this.submitForm(e)}>
              <Formfield
                id={"name"}
                formdata={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              {
                this.state.formError ? (
                  <div className="error_label">
                    Por favor revise la informacion ingresada
                  </div>
                ) : null
              }
              <button onClick={this.submitForm}>Add wood</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ManageWoods)
