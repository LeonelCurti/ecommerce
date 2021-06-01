import React, { Component } from "react";
import UserLayout from "../../hoc/user";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { getCartItems, removeCartItem } from "../../actions/user_actions";
import Spinner from "react-bootstrap/Spinner";
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

        /*
        cartItem
        ['3h4534ghj5345','3f45sdf3453']
        userData.cart
        [{id:'45454', quantity:8, date:345345}]

        */
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
        <div>
          <div>
            <Card.Header>
              <Card.Title as="h5">My Cart</Card.Title>
              {cartDetail ? (
                cartDetail.length > 0 ? (
                  <div>
                    <Table striped={false} responsive>
                      <thead>
                        <tr>
                          <th>Qty</th>
                          <th>Product</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartDetail.map((i) => (
                          <tr>
                            <td>{i.quantity}</td>
                            <td>{i.price}</td>
                            <td>
                              {i.brand.name} {i.name}
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => this.removeFromCart(i._id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="user_cart_sum ">
                      <div>Total amount: $ {this.state.total}</div>
                    </div>
                  </div>
                ) : (
                  <div className="cart_no_items mt-3">
                    <FontAwesomeIcon icon={faFrown} />
                    <div>You have no items</div>
                  </div>
                )
              ) : (
                <div className="main_loader">
                  <Spinner animation="border" />
                </div>
              )}
            </Card.Header>
          </div>
        </div>
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
