import React from "react";
import MyButton from "../utils/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
class ProdNfo extends React.Component {
  state = {
    showModal: false,
  };

  showProdTags = (detail) => (
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

  showProdActions = (detail) => (
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
        <Dialog
          onClose={() => this.setState({ showModal: false })}
          aria-labelledby="simple-dialog-title"
          open={this.state.showModal}
        >
          <DialogTitle id="simple-dialog-title">Warning</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              You must be logged in to add items.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => this.setState({ showModal: false })}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );

  showProdSpecifications = (detail) => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Category: </strong>
          {detail.category.name}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProdNfo);
