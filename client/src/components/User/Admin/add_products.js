import React, { Component } from "react";
import UserLayout from "../../../hoc/user";

import Formfield from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid
} from "../../utils/Form/formActions";

import { connect } from "react-redux";
import { getBrands, getWoods } from "../../../actions/product_actions";

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
