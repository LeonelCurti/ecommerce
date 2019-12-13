import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class ProdImg extends Component {
  state = {
    lightboxIsOpen: false,
    imagePosition: 0
  };

  renderMainCardImage = images => {
    if (images.length > 0) {
      return images[0];
    } else {
      return `/images/image_not_availble.png`;
    }
  };

  toggleLightbox = position => {
    if (this.props.images.length > 0) {
      this.setState(state => ({
        lightboxIsOpen: !state.lightboxIsOpen,
        imagePosition: position
      }));      
    }
  };

  closeModal = () => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen
    }));
  };

  showThumbs = () =>
    this.props.images.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.toggleLightbox(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat`, backgroundSize: 'contain' }}
        ></div>
      ) : null
    );

  render() {
    const { images } = this.props;
    const { lightboxIsOpen, imagePosition } = this.state;

    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderMainCardImage(images)})  no-repeat `,
              backgroundSize: 'contain'
            }}
            onClick={() => this.toggleLightbox(0)}
          ></div>
        </div>
        <div className="main_thumbs">{this.showThumbs()}</div>

        {lightboxIsOpen && (
          <Lightbox
            mainSrc={images[imagePosition]}
            nextSrc={images[(imagePosition + 1) % images.length]}
            prevSrc={
              images[(imagePosition + images.length - 1) % images.length]
            }
            onCloseRequest={() => this.setState({ lightboxIsOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                imagePosition:
                  (imagePosition + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                imagePosition: (imagePosition + 1) % images.length
              })
            }
          />
        )}
      </div>
    );
  }
}

export default ProdImg;
