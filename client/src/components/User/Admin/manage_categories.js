import React, { Component } from 'react'
import Formfield from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../utils/Form/formActions";
import { getCategories ,addCategory } from "../../../actions/product_actions";
import { connect } from "react-redux";

class ManageCats extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "category_input",
          type: "text",
          placeholder: "Enter the category"
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
    this.props.products.categories
      ? this.props.products.categories.map((item, i) => (
          <div className="category_item" key={i}>
            {item.name}
          </div>
        ))
      : null
  )

  componentDidMount() {
    this.props.dispatch(getCategories());
  }

  resetFieldsHandler = () =>{
    const newFormData = resetFields(this.state.formData, "categories")
    this.setState({
      formData: newFormData,
      formSuccess: true
    })
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "categories");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "categories");
    let formIsValid = isFormValid(this.state.formData, "categories");
    let existingCategories = this.props.products.categories

    if (formIsValid) {
     this.props.dispatch(addCategory(dataToSubmit,existingCategories))
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
        <h1>Categories</h1>
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
              <button onClick={this.submitForm}>Add category</button>
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

export default connect(mapStateToProps)(ManageCats)
