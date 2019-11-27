import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/user_actions";
import CircularProgress from "@material-ui/core/CircularProgress";

// composedclass is the componet that we will render if //everithing is ok
export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(auth()).then(response => {
        let user = this.props.user.userData;
        console.log(user);
        this.setState({ loading: false });

        if (!user.isAuth) {
          if (reload) {
            this.props.history.push("/register_login");
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            if (!reload) {
              this.props.history.push("/user/dashboard");
            }
          }
          
        }
      });
    }

    render() {
      return this.state.loading ? (
        <div className="main_loader">
          <CircularProgress style={{ color: "#2196F" }} thickness={7} />
        </div>
      ) : (
        <ComposedClass {...this.props} user={this.props.user} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }

  return connect(mapStateToProps)(AuthenticationCheck);
}
