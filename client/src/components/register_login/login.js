import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
class Login extends Component {
  state = {
    email: "client@test.com",
    password: "12345",
    formError: false,
    loading: false,
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const dataToSubmit = {
      email: this.state.email.trim(),
      password: this.state.password,
    };

    //validate data
    const emailExist = dataToSubmit.email !== "";
    const passwordExist = dataToSubmit.password !== "";
    const emailIsValid = /\S+@\S+\.\S+/.test(dataToSubmit.email);

    //submit data with dispatch loginUser
    if (emailExist && passwordExist && emailIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
        if (response.payload.loginSuccess) {
          this.setState({ loading: false });
          this.props.history.push("/user/dashboard");
        } else {
          this.setState({
            formError: true,
            loading: false,
          });
          setTimeout(() => {
            this.setState({ formError: false, loading: false });
          }, 4000);
        }
      });
    } else {
      this.setState({ formError: true , loading:false});
      setTimeout(() => {
        this.setState({ formError: false });
      }, 4000);
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
            Log in
          </Typography>
          <form onSubmit={this.submitForm} style={{ marginTop: "1.2rem" }}>
            <TextField
              variant="outlined"
              margin="normal"
              type="email"
              required
              fullWidth
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
              value={this.state.password}
              onChange={this.onChange}
            />
            <Button
              style={{ margin: "24px 0 16px" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {this.state.loading ? (
                <Box display="flex" alignItems="center">
                  <div>Sign In</div>
                  <Box display="flex" alignItems="center">
                  <CircularProgress style={{ color: "white",marginLeft:'10px' }} size={30} />
                  </Box>
                </Box>
              ) : (
                "Sign In"
              )}
              
            </Button>
            {this.state.formError && (
              <FormHelperText error={true}>
                Por favor revise la informacion ingresada
              </FormHelperText>
            )}
          </form>
        </div>
      </Container>
    );
  }
}
export default connect()(Login);
