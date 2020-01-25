import React from "react";
import CardBlockShop from "../utils/card_block_shop";


const LoadMoreCards = props => { 
  return (
    <React.Fragment>
      <CardBlockShop grid={props.grid} list={props.products} />

      {
        props.size > 0 && props.size >= props.limit ? (
          <div className="load_more_container">
            <span onClick={() => props.loadMore()}>Load More</span>
          </div>
        ) : null
      }
    </React.Fragment>
  
  );
};

export default LoadMoreCards;
