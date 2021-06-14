import React from "react";
import Container from "@material-ui/core/Container";
const PageTop = (props) => {
  return (
    <div className="page_top">
      <Container>{props.title}</Container>
    </div>
  );
};

export default PageTop;
