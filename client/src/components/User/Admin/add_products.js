import React, { Component } from "react";
import UserLayout from "../../../hoc/user";

import Formfield from "../../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields,
} from "../../utils/Form/formActions";
import FileUpload from "../../utils/Form/fileUpload";

import { connect } from "react-redux";
import {
  getBrands,
  getCategories,
  addProduct,
  clearProduct,
} from "../../../actions/product_actions";

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
          placeholder: "Nombre producto",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product description",
          name: "description_input",
          type: "text",
          placeholder: "Ingrese descripcion",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Product price",
          name: "price_input",
          type: "number",
          placeholder: "Ingrese precio",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      brand: {
        element: "select",
        value: "",
        config: {
          label: "Product Brand",
          name: "brands_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          label: "Shipping",
          name: "shipping_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      available: {
        element: "select",
        value: "",
        config: {
          label: "Available, in stock",
          name: "available_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      category: {
        element: "select",
        value: "",
        config: {
          label: "Category",
          name: "category_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      publish: {
        element: "select",
        value: "",
        config: {
          label: "Pushish",
          name: "publish_input",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showlabel: false,
      },
    },
  };

  updateFields = (newFormData) => {
    this.setState({
      formData: newFormData,
    });
  };

  imagesHandler = (images) => {
    const newFormData = {
      ...this.state.formData,
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({
      formData: newFormData,
    });
  };

  componentDidMount() {
    const formdata = this.state.formData;

    this.props.dispatch(getBrands()).then((response) => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.brands,
        "brand"
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getCategories()).then((response) => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.categories,
        "category"
      );
      this.updateFields(newFormData);
    });
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, "products");
    this.setState({
      formError: false,
      formData: newFormData,
    });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "products");
    let formIsValid = isFormValid(this.state.formData, "products");

    if (formIsValid) {
      this.props
        .dispatch(addProduct(dataToSubmit))
        .then(() => {
          if (this.props.products.addProduct.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({ formError: true });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ formError: true });
        });
    } else {
      this.setState({ formError: true });
    }
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, "products");
    this.setState({
      formData: newFormData,
      formSuccess: true,
    });
    setTimeout(() => {
      this.setState({ formSuccess: false }, () => {
        this.props.dispatch(clearProduct());
      });
    }, 3000);
  };

  render() {
    return (
      <div>
        <UserLayout>
          <div>
            <h1>Add Product</h1>
            <form onSubmit={(e) => this.submitForm(e)}>
              <FileUpload
                imagesHandler={(images) => this.imagesHandler(images)}
                reset={this.state.formSuccess}
              />
              <Formfield
                id={"name"}
                formdata={this.state.formData.name}
                change={(element) => this.updateForm(element)}
              />
              <Formfield
                id={"description"}
                formdata={this.state.formData.description}
                change={(element) => this.updateForm(element)}
              />
              <Formfield
                id={"price"}
                formdata={this.state.formData.price}
                change={(element) => this.updateForm(element)}
              />
              <div className="form_devider"></div>
              <Formfield
                id={"brand"}
                formdata={this.state.formData.brand}
                change={(element) => this.updateForm(element)}
              />
              <Formfield
                id={"shipping"}
                formdata={this.state.formData.shipping}
                change={(element) => this.updateForm(element)}
              />
              <Formfield
                id={"available"}
                formdata={this.state.formData.available}
                change={(element) => this.updateForm(element)}
              />
              <div className="form_devider"></div>
              <Formfield
                id={"category"}
                formdata={this.state.formData.category}
                change={(element) => this.updateForm(element)}
              />
              <div className="form_devider"></div>
              <Formfield
                id={"publish"}
                formdata={this.state.formData.publish}
                change={(element) => this.updateForm(element)}
              />
              {this.state.formSuccess ? (
                <div className="form_success">Success</div>
              ) : null}

              {this.state.formError ? (
                <div className="error_label">
                  Please check fields and try again
                </div>
              ) : null}

              <button className="btn btn-primary" onClick={this.submitForm}>
                Add product
              </button>
            </form>
          </div>
        </UserLayout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(AddProducts);
