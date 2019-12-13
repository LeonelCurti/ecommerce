import React from 'react'
import MyButton from '../utils/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';



const ProdNfo = (props) => {

  const {detail} = props;

  const showProdTags = (detail) =>(
    <div className="product_tags">
      {
        detail.shipping
        ?<div className="tag">
            <div>
              <FontAwesomeIcon icon={faTruck}/>
            </div>
            <div className="tag_text">
              <div>Free shipping</div>
              <div>And return</div>
            </div>
          </div>
        :null
      }
      {
        detail.available
        ?<div className="tag">
            <div>
              <FontAwesomeIcon icon={faCheck}/>
            </div>
            <div className="tag_text">
              <div>Available</div>
              <div>in store</div>
            </div>
          </div>
        :<div className="tag">
            <div>
              <FontAwesomeIcon icon={faTimes}/>
            </div>
            <div className="tag_text">
              <div>Not Available</div>
              <div>Preorder only</div>
            </div>
          </div>
      }
    </div>
  )

  const showProdActions = ()=> (
    <div className="product_actions">
      <div className="price">
        $ {detail.price}
      </div>
      <div className="cart">
        <MyButton 
          type='add_to_cart_link'
          runAction={()=>console.log('add to cart')}
        />
      </div>
    </div>
  )

  const showProdSpecifications = () =>(
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets: </strong>{detail.frets}
        </div>
        <div className="item">
          <strong>Woods: </strong>{detail.wood.name}
        </div>
      </div>
    </div>
  )

  
  return (
    <div>
      <h1>{detail.brand.name} {detail.name}</h1>
      <p>{detail.description}</p>
      { showProdTags(detail) }
      { showProdActions(detail) }
      { showProdSpecifications(detail) }
    </div>
  )
}

export default ProdNfo
