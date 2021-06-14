import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/user_actions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { Link as RouterLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import Badge from "@material-ui/core/Badge";
class Header extends Component {
  state = {
    anchorEl: null,
  };
  handleMenuOpen = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  logoutHandler = () => {
    this.handleMenuClose();
    this.props.dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
  };

  cartItemCount = () => {
    const user = this.props.user.userData;
    return user.cart ? user.cart.length : 0;
  };

  render() {
    return (
      // <div className={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "white", color: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            to="/"
            component={RouterLink}
            style={{ flexGrow: 1, color: "black" }}
          >
            Black Hawk
          </Typography>
          {this.props.user.userData.isAuth && (
            <IconButton
              aria-label="show 11 new notifications"
              color="inherit"
              style={{ marginRight: "30px" }}
              size="small"
            >
              <Badge
                showZero
                badgeContent={this.cartItemCount()}
                color="secondary"
              >
                <RouterLink to="/user/cart">
                  <FontAwesomeIcon
                    style={{ color: "black" }}
                    icon={faShoppingCart}
                  />
                </RouterLink>
              </Badge>
            </IconButton>
          )}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={this.handleMenuOpen}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Toolbar>
        {this.props.user.userData.isAuth ? (
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.handleMenuClose}>
              <RouterLink to="/shop">Shop</RouterLink>
            </MenuItem>
            <MenuItem onClick={this.handleMenuClose}>
              <RouterLink to="/user/cart">Cart</RouterLink>
            </MenuItem>
            <MenuItem onClick={this.handleMenuClose}>
              <RouterLink to="/user/dashboard">Dashboard</RouterLink>
            </MenuItem>
            <MenuItem
              style={{
                color: "#007bff",
                // paddingTop: "0px",
                // paddingBottom: "0px",
              }}
              onClick={() => this.logoutHandler()}
            >
              Logout
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.handleMenuClose}>
              <RouterLink to="/shop">Shop</RouterLink>
            </MenuItem>
            <MenuItem onClick={this.handleMenuClose}>
              <RouterLink to="/login">Login</RouterLink>
            </MenuItem>
            <MenuItem onClick={this.handleMenuClose}>
              <RouterLink to="/register">Register</RouterLink>
            </MenuItem>
          </Menu>
        )}
      </AppBar>
      // </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null, null, {
  pure: false,
})(withRouter(Header));
