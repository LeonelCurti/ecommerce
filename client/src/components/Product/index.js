import React, { Component } from "react";
import PageTop from "../utils/page_top";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { getProductDetail, clearProductDetail } from "../../actions/product_actions";

import { addToCart } from '../../actions/user_actions'

import ProdNfo from "./prodNfo";
import ProdImg from "./prod_img";

class ProductPage extends Component {  

  componentDidMount() {   
    
    const id = this.props.match.params.id; 
    this.props.dispatch(getProductDetail(id))
    .then(response =>{      
      if(response.payload==='')
        this.props.history.push('/')
    })
    
       
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  modifiedImageToPass = images => {
      
    let lightboxImages = [];
    images.forEach(item => {
      lightboxImages.push(item.url);
    });  
    return lightboxImages;
  };

  addToCartHandler = (id) =>{
    this.props.dispatch(addToCart(id))    
  }

  render() {     
    
    
    return (
      <div>
        <PageTop title="Product detail" />
        <div className="container">
          {this.props.products.prodDetail ? (
            <div className="product_detail_wrapper">          
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProdImg
                  images={this.modifiedImageToPass(
                      this.props.products.prodDetail.images
                    )}
                  />                  
                </div>
              </div>
              <div className="right">
                <ProdNfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={this.props.products.prodDetail}
                />
              </div>
            </div>
          ) : (
            <div style={{textAlign:'center',paddingTop:'10px'}}>
              <CircularProgress 
                style={{color:'#00bcd4'}}
                thikness={7}
              />

            </div>
          )}
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

export default connect(mapStateToProps)(ProductPage);
