import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";

const NotFound = () => {
  return (
    <Container>
      <div className="not_found_container">
        <FontAwesomeIcon icon={faExclamationCircle} />
        <div>Oops !! Page not found</div>
      </div>
    </Container>
  );
};

export default NotFound;
