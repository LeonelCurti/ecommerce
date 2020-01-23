import React from "react";
import Card from "./card";
import Container from "react-bootstrap/Container";

const CardBlock = props => {
  const renderCards = () =>
    props.list ? props.list.map((card, i) => <Card key={i} {...card} />) : null;

  return (
    <section className="card_block">
      <Container>
        {
          props.title 
          ? <div className="title">{props.title}</div> 
          : null
        }
        <div
          className='primordial'
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {renderCards()}
        </div>
      </Container>
    </section>
  );
};

export default CardBlock;
