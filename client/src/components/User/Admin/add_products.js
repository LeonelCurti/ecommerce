import React, { Component } from "react";
import UserLayout from "../../../hoc/user";

import Formfield from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields
} from "../../utils/Form/formActions";

import { connect } from "react-redux";
import { getBrands, getWoods, addProduct, clearProduct  } from "../../../actions/product_actions";

class AddProducts extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Nombre",
          name: "name_input",
          type: "text",
          placeholder: "Nombre producto"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product description",
          name: "description_input",
          type: "text",
          placeholder: "Ingrese descripcion"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Product price",
          name: "price_input",
          type: "number",
          placeholder: "Ingrese precio"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      brand: {
        element: "select",
        value: "",
        config: {
          label: "Product Brand",
          name: "brands_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          label: "Shipping",
          name: "shipping_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      available: {
        element: "select",
        value: "",
        config: {
          label: "Available, in stock",
          name: "available_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      wood: {
        element: "select",
        value: "",
        config: {
          label: "Wood material",
          name: "wood_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      frets: {
        element: "select",
        value: "",
        config: {
          label: "Frets",
          name: "frets_input",
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      publish: {
        element: "select",
        value: "",
        config: {
          label: "Pushish",
          name: "publish_input",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      }
    }
  };

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  componentDidMount() {
    const formdata = this.state.formData;

    this.props.dispatch(getBrands()).then(response => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.brands,
        "brand"
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getWoods()).then(response => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.woods,
        "wood"
      );
      this.updateFields(newFormData);
    });
  }

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "products");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "products");
    let formIsValid = isFormValid(this.state.formData, "products");

    if (formIsValid) {
      
       this.props.dispatch(addProduct(dataToSubmit))
       .then(()=>{
         if (this.props.products.addProduct.success) {
           this.resetFieldsHandler();
         }else {
           this.setState({formError: true})
         }
       })
       
    } else {
      this.setState({ formError: true });
    }
  };


  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, "products")
    this.setState({
      formData: newFormData,
      formSuccess: true
    })
    setTimeout(()=>{
      this.setState({formSuccess:false}, ()=>{
        this.props.dispatch(clearProduct())
      })
    },3000)
  }

  render() {
    return (
      <div>
        <UserLayout>
          <div>
            <h1>Agregar Producto</h1>
            <form onSubmit={e => this.submitForm(e)}>
              <Formfield
                id={"name"}
                formdata={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              <Formfield
                id={"description"}
                formdata={this.state.formData.description}
                change={element => this.updateForm(element)}
              />
              <Formfield
                id={"price"}
                formdata={this.state.formData.price}
                change={element => this.updateForm(element)}
              />
              <div className="form_devider"></div>
              <Formfield
                id={"brand"}
                formdata={this.state.formData.brand}
                change={element => this.updateForm(element)}
              />
              <Formfield
                id={"shipping"}
                formdata={this.state.formData.shipping}
                change={element => this.updateForm(element)}
              />
              <Formfield
                id={"available"}
                formdata={this.state.formData.available}
                change={element => this.updateForm(element)}
              />
              <div className="form_devider"></div>
              <Formfield
                id={"wood"}
                formdata={this.state.formData.wood}
                change={element => this.updateForm(element)}
              />
              <Formfield
                id={"frets"}
                formdata={this.state.formData.frets}
                change={element => this.updateForm(element)}
              />
              <div className="form_devider"></div>
              <Formfield
                id={"publish"}
                formdata={this.state.formData.publish}
                change={element => this.updateForm(element)}
              />
              {this.state.formSuccess ? (
                <div className="form_success">Success</div>
              ) : null}

              {this.state.formError ? (
                <div className="error_label">
                  Por favor revise la informacion ingresada
                </div>
              ) : null}

              <button onClick={this.submitForm}>Add product</button>
            </form>
          </div>
        </UserLayout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AddProducts);
