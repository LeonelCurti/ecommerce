import React, { Component } from 'react'
import UserLayout from '../../hoc/user'

import {connect} from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { getCartItems, removeCartItem } from '../../actions/user_actions'
import UserProductBlock from '../utils/User/product_block'

class Cart extends Component {

  state = {
    loading:true,
    total:0,
    showTotal:false,
    showSuccess:false
  }

  componentDidMount(){
    let cartItems = [];
    let user= this.props.user

    if(user.userData.cart){
      if(user.userData.cart.length > 0){
        user.userData.cart.forEach((item)=>{
          cartItems.push(item.id)
        });        
        
        /*
        cartItem
        ['3h4534ghj5345','3f45sdf3453']
        userData.cart
        [{id:'45454', quantity:8, date:345345}]

        */
        this.props.dispatch(getCartItems(cartItems,user.userData.cart))
        .then(()=>{
          if(this.props.user.cartDetail.length > 0){
            this.calculateTotal(this.props.user.cartDetail)
          }
        })
      }
    }
  }

  calculateTotal = (cartDetail)=>{
    let total = 0;
    cartDetail.forEach(item=>{
      total += parseInt(item.price, 10) * item.quantity
    });
    this.setState({
      showTotal: true,
      total: total
    })
  }

  removeFromeCart = (id) =>{
    this.props.dispatch(removeCartItem(id))
    .then(()=>{
      if(this.props.user.cartDetail.length <= 0){
        this.setState({
          showTotal: false
        })
      }else{
        this.calculateTotal(this.props.user.cartDetail)
      }
    })
  }

  showNoItemMessage = ()=> (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown}/>
      <div>
        You have no items
      </div>
    </div>
  )

  render(){
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className='user_cart'>
            <UserProductBlock 
              products={this.props.user}
              type='cart'
              removeItem={id=>this.removeFromeCart(id)}
            />
            {
              this.state.showTotal
              ?<div>
                <div className="user_cart_sum">
                  <div>
                    Total amount: $ {this.state.total}
                  </div>
                </div>
              </div>
              :this.showNoItemMessage()
            }
          </div>
        </div>
  
      </UserLayout>  
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(Cart)
