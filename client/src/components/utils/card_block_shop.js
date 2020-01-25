import React from "react";
import Card from "../utils/card";

const CardBlockShop = props => {
  const renderCards = () =>
    props.list
      ? props.list.map(card => (
          <Card key={card._id} {...card} grid={props.grid} />
        ))
      : null;
  return (
    <div className="card_block_shop row">
      {props.list ? (
        props.list.length === 0 ? (
          <div className="no_result">Sorry, no results</div>
        ) : null
      ) : null}
      {renderCards(props.list)}
    </div>
  );
};

export default CardBlockShop;
