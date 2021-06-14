import React, { Component } from "react";
import UserLayout from "../../hoc/user";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getCartItems, removeCartItem } from "../../actions/user_actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false,
  };

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;

    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        this.props
          .dispatch(getCartItems(cartItems, user.userData.cart))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculateTotal(this.props.user.cartDetail);
            }
          });
      }
    }
  }

  calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    this.setState({
      showTotal: true,
      total: total,
    });
  };

  removeFromCart = (id) => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false,
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  render() {
    const cartDetail = this.props.user.cartDetail;
    return (
      <UserLayout>
        {cartDetail ? (
          cartDetail.length > 0 ? (
            <Paper elevation={2}>
              <Toolbar>
                <Typography
                  style={{ flexGrow: 1 }}
                  // className={classes.title}
                  variant="h5"
                  id="tableTitle"
                >
                  My Cart
                </Typography>
                <Typography
                  // className={classes.title}
                  variant="subtitle2"
                  id="tableTitle"
                >
                  Total amount: $ {this.state.total}
                </Typography>
              </Toolbar>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Qty</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartDetail.map((i) => (
                      <TableRow key={i._id}>
                        <TableCell align="right">{i.quantity}</TableCell>
                        <TableCell>
                          {i.brand.name} {i.name}
                        </TableCell>
                        <TableCell align="right">{i.price}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            aria-label="delete"
                            onClick={() => this.removeFromCart(i._id)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ) : (
            <div className="cart_no_items mt-3">
              <FontAwesomeIcon icon={faFrown} />
              <div>You have no items</div>
            </div>
          )
        ) : (
          <div className="cart_no_items mt-3">
            <FontAwesomeIcon icon={faFrown} />
            <div>You have no items</div>
          </div>
        )}
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Cart);
