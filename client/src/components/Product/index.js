import React, { Component } from "react";
import PageTop from "../utils/page_top";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail,
} from "../../actions/product_actions";
import { addToCart } from "../../actions/user_actions";
import ProdNfo from "./prodNfo";
import ProdImg from "./prod_img";
import Container from "@material-ui/core/Container";

class ProductPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id)).then((response) => {
      if (response.payload === "") this.props.history.push("/");
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  modifiedImageToPass = (images) => {
    let lightboxImages = [];
    images.forEach((item) => {
      lightboxImages.push(item.url);
    });
    return lightboxImages;
  };

  addToCartHandler = (id) => {
    this.props.dispatch(addToCart(id));
  };

  render() {
    return (
      <div>
        <PageTop title="Product detail" />
        <Container>
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper row">
              <div className="col-sm-6">
                <ProdImg
                  images={this.modifiedImageToPass(
                    this.props.products.prodDetail.images
                  )}
                />
              </div>
              <div className="col-sm-6 text-center text-sm-left pt-4">
                <ProdNfo
                  addToCart={(id) => this.addToCartHandler(id)}
                  detail={this.props.products.prodDetail}
                />
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", paddingTop: "10px" }}>
              <CircularProgress  />
            </div>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductPage);
