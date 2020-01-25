import React from 'react'

const UserProductBlock = ({products, type, removeItem}) => {
  const renderItems = ()=>(
    products.cartDetail
    ?products.cartDetail.map(product=>(
      <div 
        className="user_product_block row text-center"
        key={product._id}
        >   
        <div className="item col-sm">
          <h4>Product</h4>
          <div>
            {product.brand.name} {product.name}
          </div>
        </div>
        <div className="item col-sm">
          <h4>Quantity</h4>
          <div>
            {product.quantity}
          </div>
        </div>
        <div className="item col-sm">
          <h4>Price</h4>
          <div>
            {product.price}
          </div>
        </div>
        <div className='item col-sm'>
          <button className="btn btn-danger"
          onClick={()=>removeItem(product._id)}
          >X</button>         
        </div>
      </div>
    ))
    :null
  )


  return (
    <div>
      {renderItems()}
    </div>
  )
}

export default UserProductBlock
