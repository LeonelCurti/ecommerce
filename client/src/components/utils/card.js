import React, { Component } from "react";
import MyButton from "./button";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import Modal from 'react-bootstrap/Modal';

class Card extends Component {

  state={
    showModal: false
  }

  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  };

  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
          }}
        ></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="price">${props.price}</div>
          </div>

          {props.grid ? (
            <div className="description">
              <p>{props.description}</p>
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product_detail/${props._id}`}
                addStyle={{
                  margin: "10px 0 0 0"
                }}
              />
            </div>
            <div className="button_wrapp">
              <MyButton
                type="bag_link"
                runAction={() => {
                  props.user.userData.isAuth
                    ? this.props.dispatch(addToCart(props._id))
                    : this.setState({showModal:true});
                }}
                altClass="card_link"
                title="View product"
                linkTo={`/product_detail/${props._id}`}
                addStyle={{
                  margin: "10px 0 0 0"
                }}
              />

              <Modal
                size="sm"
                show={this.state.showModal}
                onHide={() => this.setState({showModal:false})}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-sm">
                    Warning
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>You must be logged in to add items.</Modal.Body>
              </Modal>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Card);
