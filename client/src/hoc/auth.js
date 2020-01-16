import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/user_actions";
import Spinner from 'react-bootstrap/Spinner'

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
          //user NOT authenticated
          if (reload) this.props.history.push("/login");
        } else {
          //user authenticated
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            if (reload === false) this.props.history.push("/user/dashboard");
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
      // return true ? (
      return this.state.loading ? (
        <div className="main_loader">          
          <Spinner animation="border" />          
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
