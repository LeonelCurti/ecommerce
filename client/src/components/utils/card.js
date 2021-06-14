import React, { Component } from "react";
import MyButton from "./button";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Card extends Component {
  state = {
    showModal: false,
  };

  renderCardImage = (images) => {
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
            background: `url(${this.renderCardImage(props.images)}) no-repeat`,
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
                  margin: "10px 0 0 0",
                }}
              />
            </div>
            <div className="button_wrapp">
              <MyButton
                type="bag_link"
                runAction={() => {
                  props.user.userData.isAuth
                    ? this.props.dispatch(addToCart(props._id))
                    : this.setState({ showModal: true });
                }}
                altClass="card_link"
                title="View product"
                linkTo={`/product_detail/${props._id}`}
                addStyle={{
                  margin: "10px 0 0 0",
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Card);
