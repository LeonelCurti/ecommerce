import React, { Component } from "react";
import PageTop from "../utils/page_top";

import { connect } from "react-redux";
import { getBrands, getWoods } from "../../actions/product_actions";

import CollapseCheckbox from "../utils/collapseCheckbox";
import CollapseRadio from "../utils/collapseRadio";
import { frets, prices } from "../utils/Form/fixed_categories";

class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());
  }

  handlePrice = (value) =>{
    const data = prices;
    let array = [];
    for(let key in data){
      if (data[key]._id === parseInt(value,10)) {
        array = data[key].array
      }
    }
    return array
    
  }

  handleFilters = (filters, category) => {
    //recibe el array de _id tildados
    //y los ubica en su respectiva category
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;
    if (category === "price") {
      let priceValues = this.handlePrice(filters)
      newFilters[category] = priceValues
    }

    this.setState({
      filters: newFilters
    });
  };

  render() {
    console.log(this.state.filters)
    const products = this.props.products;
    return (
      <div className="container">
        <PageTop title="Browse Products" />

        <div>
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, "brand")}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, "frets")}
              />
              <CollapseCheckbox
                initState={true}
                title="Woods"
                list={products.woods}
                handleFilters={filters => this.handleFilters(filters, "wood")}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={prices}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>

            <div className="right">right</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Shop);
