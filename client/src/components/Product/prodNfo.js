import React from "react";
import MyButton from "../utils/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";

class ProdNfo extends React.Component {
  state = {
    showModal: false
  };

  showProdTags = detail => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free shipping</div>
            <div>And return</div>
          </div>
        </div>
      ) : null}
      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className="tag_text">
            <div>Available</div>
            <div>in store</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="tag_text">
            <div>Not Available</div>
            <div>Preorder only</div>
          </div>
        </div>
      )}
    </div>
  );

  showProdActions = detail => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => {
            this.props.user.userData.isAuth
              ? this.props.addToCart(detail._id)
              : this.setState({ showModal: true });
          }}
        />
        <Modal
          size="sm"
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>You must be logged in to add items.</Modal.Body>
        </Modal>
      </div>
    </div>
  );

  showProdSpecifications = detail => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets: </strong>
          {detail.frets}
        </div>
        <div className="item">
          <strong>Woods: </strong>
          {detail.wood.name}
        </div>
      </div>
    </div>
  );

  render() {
    const { detail } = this.props;

    return (
      <React.Fragment>
        <h1>
          {detail.brand.name} {detail.name}
        </h1>
        <p>{detail.description}</p>
        {this.showProdTags(detail)}
        {this.showProdActions(detail)}
        {this.showProdSpecifications(detail)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ProdNfo);
