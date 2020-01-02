import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/user_actions";

class Header extends Component {
 

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
  };  
  // PONER INDICADOR DE ELEMENTOS EN MY CART
  cartLink = (item, i) => {
    const user = this.props.user.userData;
    return (
      <div className="cart_link" key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={item.linkTo}>{item.name}</Link>
      </div>
    );
  }; 

  render() {    
    return (
      <nav className="navbar">
        <h1>
          <span className="text-primary">
            <Link to="/">CASA | DECOR</Link>
          </span>
        </h1>
        <ul>
          <li>
            <Link to="/shop">SHOP</Link>
          </li>
          {this.props.user.userData.isAuth ? (
            <React.Fragment>
              <li>
                <Link to="/user/cart">MY CART</Link>
              </li>
              <li>
                <Link to="/user/logout" onClick={() => this.logoutHandler()}>LOG OUT</Link>
              </li>
              <li>
                <Link to="/user/dashboard">DASHBOARD</Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/login">LOG IN</Link>
              </li>
              <li>
                <Link to="/register">REGISTER</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(withRouter(Header));
