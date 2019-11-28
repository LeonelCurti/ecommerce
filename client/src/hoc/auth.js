import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/user_actions";
import CircularProgress from "@material-ui/core/CircularProgress";

// composedclass is the componet that we will render if //everything is ok
export default function(ComposedClass, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {
    _isMounted = false;
    state = {
      loading: true
    };

    componentDidMount() {
      this._isMounted = true;
      this.props.dispatch(auth()).then(response => {
        let user = this.props.user.userData;

        if (!user.isAuth) {
          //user is NOT authenticated
          if (reload) this.props.history.push("/register_login");
        } else {
          //user is authenticated
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            if (!reload) this.props.history.push("/user/dashboard");
          }
        }        
        if (this._isMounted) {
          this.setState({loading: false})
        }        
      });
    }
    componentWillUnmount() {
      this._isMounted = false;
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
