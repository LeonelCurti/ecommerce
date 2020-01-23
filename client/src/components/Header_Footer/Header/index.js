import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/user_actions";
import { LinkContainer } from "react-router-bootstrap";

import { Nav, Navbar, Container } from "react-bootstrap";

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
      
      <Navbar 
        collapseOnSelect
        // bg="primary"
        className='navbar-custom'       
        style={{
          backgroundColor: "white",
        }} //sacar bg
        // variant="dark"        
        expand="sm"        
        fixed='top'
        
      >       
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Black Hawk</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav            
            className="ml-auto"
            >          
                           
              <LinkContainer to="/shop">
                <Nav.Link>SHOP</Nav.Link>
              </LinkContainer>
                   

              {this.props.user.userData.isAuth ? (
                <React.Fragment>
                  <LinkContainer to="/user/cart">
                    <Nav.Link>CART</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/user/logout">
                    <Nav.Link onClick={() => this.logoutHandler()}>
                      LOG OUT
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/user/dashboard">
                    <Nav.Link>DASHBOARD</Nav.Link>
                  </LinkContainer>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <LinkContainer to="/login">
                    <Nav.Link>LOG IN</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>SIGN IN</Nav.Link>
                  </LinkContainer>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null, null,{
  pure: false
})(withRouter(Header));
