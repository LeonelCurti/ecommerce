import React, { Component } from "react";
import Formfield from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../utils/Form/formActions";
import { getBrands , addBrand} from "../../../actions/product_actions";
import { connect } from "react-redux";

class ManageBrands extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "brand_input",
          type: "text",
          placeholder: "Enter the brand"
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
    this.props.products.brands
      ? this.props.products.brands.map((item, i) => (
          <div className="category_item" key={i}>
            {item.name}
          </div>
        ))
      : null
  )

  componentDidMount() {
    this.props.dispatch(getBrands());
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "brands");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  resetFieldsHandler = () =>{
    const newFormData = resetFields(this.state.formData, "brands")
    this.setState({
      formData: newFormData,
      formSuccess: true
    })
  }

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "brands");
    let formIsValid = isFormValid(this.state.formData, "brands");
    let existingBrands = this.props.products.brands

    if (formIsValid) {
     this.props.dispatch(addBrand(dataToSubmit,existingBrands))
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
        <h1>Brands</h1>
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
              <button onClick={this.submitForm}>Add brand</button>
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

export default connect(mapStateToProps)(ManageBrands);
