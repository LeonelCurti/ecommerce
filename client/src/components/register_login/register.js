import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

class Register extends Component {
  state = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    formError: false,
    registerSuccess: false,
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
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  submitForm = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      name: this.state.name.trim(),
      lastname: this.state.lastName.trim(),
      email: this.state.email.trim(),
      password: this.state.password,
    };

    //validate data
    const nameExist = dataToSubmit.name !== "";
    const lastNameExist = dataToSubmit.lastname !== "";
    const emailExist = dataToSubmit.email !== "";
    const passwordExist = dataToSubmit.password !== "";
    const passwordlenght = dataToSubmit.password.length > 4;
    const emailIsValid = /\S+@\S+\.\S+/.test(dataToSubmit.email);

    //submit data with dispatch registerUser
    if (
      nameExist &&
      lastNameExist &&
      emailExist &&
      passwordExist &&
      passwordlenght &&
      emailIsValid
    ) {
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            this.setState({
              registerSuccess: true,
            });
            setTimeout(() => {
              this.props.history.push("/login");
            }, 4000);
          } else {
            this.setState({
              formError: true,
              errorMsg: response.payload.err,
            });
            setTimeout(() => {
              this.setState({
                formError: false,
                errorMsg: "",
              });
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            formError: true,
            errorMsg: "Ha ocurrido un error, vuelva a intentarlo",
          });
          setTimeout(() => {
            this.setState({
              formError: false,
              errorMsg: "",
            });
          }, 5000);
        });
    } else {
      this.setState({
        formError: true,
        errorMsg: "Revise la informacion ingresada y vuelva a intentar",
      });
      setTimeout(() => {
        this.setState({
          formError: false,
          errMsg: "",
        });
      }, 5000);
    }
  };

  render() {
    return (
      <Container maxWidth="xs">
        <div
          style={{
            margin: "5rem 0 7rem 0",
          }}
        >
          <Typography component="h1" variant="h5" align="center">
            Register
          </Typography>
          <form onSubmit={this.submitForm} style={{ marginTop: "1.2rem" }}>
            <TextField
              variant="outlined"
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

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText="Must be 5 or more characters."
              value={this.state.password}
              onChange={this.onChange}
            /> 

            <Button
              style={{ margin: "24px 0 16px"}}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {this.state.registerSuccess ? (
                <Box display="flex" alignItems="center">
                  <div>Register success! redirecting...</div>
                  <Box display="flex" alignItems="center">
                  <CircularProgress style={{ color: "white",marginLeft:'10px' }} size={30} />
                  </Box>
                </Box>
              ) : (
                "Register"
              )}
            </Button>

            {this.state.formError && (
              <FormHelperText error={true}>
                Please check the information provided
              </FormHelperText>
            )}
          </form>
        </div>
      </Container>
    );
  }
}

export default connect()(Register);
