import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserData, clearUpdateUser } from "../../actions/user_actions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
class UpdatePersonalNfo extends Component {
  state = {
    name: "",
    lastName: "",
    email: "",
    formError: false,
    updateSuccess: false,
    errorMsg: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.email.length > 0
    );
  }

  submitForm = (event) => {
    event.preventDefault();

    const dataToSubmit = {
      name: this.state.name.trim(),
      lastname: this.state.lastName.trim(),
      email: this.state.email.trim(),
    };

    //validate data
    const nameExist = dataToSubmit.name !== "";
    const lastNameExist = dataToSubmit.lastname !== "";
    const emailExist = dataToSubmit.email !== "";
    const emailIsValid = /\S+@\S+\.\S+/.test(dataToSubmit.email);

    //submit data with dispatch updateUserData

    if (nameExist && lastNameExist && emailExist && emailIsValid) {
      this.props.dispatch(updateUserData(dataToSubmit)).then((response) => {
        if (this.props.user.updateUser.success) {
          this.setState(
            {
              updateSuccess: true,
            },
            () => {
              setTimeout(() => {
                this.props.dispatch(clearUpdateUser());
                this.setState({
                  updateSuccess: false,
                });
              }, 2000);
            }
          );
        }
      });
    } else {
      this.setState({
        formError: true,
        errorMsg: "Please check the information and try again",
      });
      setTimeout(() => {
        this.setState({
          formError: false,
          errMsg: "",
        });
      }, 5000);
    }
  };

  componentDidMount() {
    const { email, name, lastname } = this.props.user.userData;

    this.setState({
      name,
      email,
      lastName: lastname,
    });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Typography component="h1" variant="h5" align="center">
          User Profile
        </Typography>
        <form onSubmit={this.submitForm} style={{ marginTop: "1.2rem" }}>
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={this.state.name}
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <Button
            style={{ margin: "24px 0 16px" }}
            fullWidth
            variant="contained"
            color="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            {this.state.updateSuccess ? "Edit Success!!" : "Edit"}
          </Button>

          {this.state.formError && (
            <FormHelperText error={true}>{this.state.errorMsg}</FormHelperText>
          )}
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(UpdatePersonalNfo);
