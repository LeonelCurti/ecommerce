import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

class HomeCarousel extends Component {
  state = {
    index: 0,
    direction: null
  };

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  };

  render() {
    return (
      <section className="home-slider">
        <Carousel
          onSelect={this.handleSelect}
          activeIndex={this.state.index}
          direction={this.state.direction}
          interval={3000}
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/featured/bg-home-1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 className="mb-4">First photo</h3>
              <Link to="/shop" className="btn btn-primary mb-4">
                Shop
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/featured/bg-home-2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3 className="mb-4">Second photo</h3>{" "}
              <Link to="/shop" className="btn btn-primary mb-4">
                Shop
              </Link>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/featured/bg-home-3.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 className="mb-4">Third photo</h3>
              <Link to="/shop" className="btn btn-primary mb-4">
                Shop
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    );
  }
}

export default HomeCarousel;
