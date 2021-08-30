import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-dark" id="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="text-center">
              <h3 className="section-title text-white pt-2">Contact</h3>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="row mt-1">
              <div className="col-sm-4">
                <div className="single-contact text-center text-white">
                  <FontAwesomeIcon icon={faPhone} className="icon" />
                  <h4>Phone</h4>
                  <p>000-111-222 333</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="single-contact text-center text-white">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                  <h4>Address</h4>
                  <p>Medreva 819</p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="single-contact text-center text-white">
                  <FontAwesomeIcon icon={faClock} className="icon" />
                  <h4>Schedule</h4>
                  <p>10-13 14-19</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 pt-2 ">
          <div className="col-md-12">
            <div className="text-white footer-wrapper">
              <div className="text-center">
                <p className="copyright pb-0">
                  2021 © Black Hawk. Developed by{" "}
                  <a href="https://www.twitter.com/leomcurti">Leonel</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
