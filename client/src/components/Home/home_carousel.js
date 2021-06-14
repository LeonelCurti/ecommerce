import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import Button from "@material-ui/core/Button";
import { Carousel } from "react-responsive-carousel";
class HomeCarousel extends Component {
  state = {
    index: 0,
  };

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
    });
  };

  render() {
    return (
      <Carousel
        showThumbs={false}
        // autoPlay
        showStatus={false}
      >
        <div>
          <img src="/images/featured/bg-home-1.jpg" alt="slide 1" />
          <Button
            variant="contained"
            style={{
              width: "16%",
              left: "87%",
              position: "absolute",
              bottom: "40px",
              marginLeft: "-45%",
              // background: "#000",
              // padding: "0 5px",
              fontSize: "1rem",
            }}
            component={Link}
            to="/shop"
          >
            Shop
          </Button>
        </div>
        <div>
          <img src="/images/featured/bg-home-2.jpg" alt="slide 2" />
          <Button
            variant="contained"
            style={{
              width: "16%",
              left: "87%",
              position: "absolute",
              bottom: "40px",
              marginLeft: "-45%",
              // background: "#000",
              // padding: "5px",
              fontSize: "1rem",
            }}
            component={Link}
            to="/shop"
          >
            Shop
          </Button>
        </div>
        <div>
          <img src="/images/featured/bg-home-3.jpg" alt="slide 3" />
          <Button
            variant="contained"
            style={{
              width: "16%",
              left: "87%",
              position: "absolute",
              bottom: "40px",
              marginLeft: "-45%",
              // background: "#000",
              // padding: "5px",
              fontSize: "1rem",
            }}
            component={Link}
            to="/shop"
          >
            Shop
          </Button>
        </div>
      </Carousel>
    );
  }
}

export default HomeCarousel;
