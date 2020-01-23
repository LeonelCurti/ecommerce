import React, { Component } from "react";
// import HomeSlider from "./home_slider";
import HomeCarousel from './home_carousel'
import HomeFirst from "./home_first";
import CardBlock from "../utils/card_block";
import { connect } from "react-redux";
import {
  getProductsByArrival,
  getProductsBySell
} from "../../actions/product_actions";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <React.Fragment>
        <HomeFirst />
        {/* <HomeSlider /> */}
        <HomeCarousel />
        <CardBlock
          list={this.props.products.bySell}
          title="Best Sellers"
        />
        <CardBlock 
          list={this.props.products.byArrival} 
          title="New Arrivals" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Home);
