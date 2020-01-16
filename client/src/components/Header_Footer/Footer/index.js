import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="pt-4 pb-4">
        <Container>
          <h2 className="text-center pb-3">Contacto</h2>
          <Row>
            <Col className="mb-3">
              <FontAwesomeIcon icon={faCompass} className="icon" />
              <div className="nfo">
                <div>Dirección</div>
                <div>
                  <a href="https://goo.gl/maps/nXoRdsT4BzMkT5CJ6">
                    Galicia 819
                  </a>
                </div>
              </div>
            </Col>

            <Col className="mb-3">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <div className="nfo">
                <div>Teléfono</div>
                <div>45645356</div>
              </div>
            </Col>

            <Col className="mb-3">
              <FontAwesomeIcon icon={faClock} className="icon" />
              <div className="nfo">
                <div>Horario</div>
                <div>Mon-Sun/9am-8pm</div>
              </div>
            </Col>

            <Col className="mb-3">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <div className="nfo">
                <div>Email</div>
                <div>nfo@waves.com</div>
              </div>
            </Col>
          </Row>

          <div className="text-center">
            © 2020 Casa Decor | Development by{" "}
            <a 
            href="https://www.twitter.com/leomcurti">leonel</a>
          </div>
        </Container>
      </footer>
    );
  }
}
