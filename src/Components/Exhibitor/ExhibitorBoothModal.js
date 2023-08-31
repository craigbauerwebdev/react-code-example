import PropTypes from "prop-types";
import React from "react";

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener("keyup", this.onKeyUp, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.onKeyUp, false);
  }

  onClose = (e) => {
    // OEPAnalytics.save(e.currentTarget, this, e);
    this.props.onClose(e);
  };
  playVideo = () => {
    document.getElementsByClassName("play-overlay")[0].classList.add("hidden");
    document
      .getElementsByClassName("booth-video-container")[0]
      .getElementsByTagName("video")[0]
      .setAttribute("controls", "");
    document
      .getElementsByClassName("booth-video-container")[0]
      .getElementsByTagName("video")[0]
      .play();
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="booth-modal-wrapper">
        <div
          className="booth-modal-background"
          data-oepa={`Exhibitor Single | ${this.props.exhibitor} | Exhibitor Booth | ${this.props.modalFor} - Close`}
          onClick={(e) => {
            this.onClose(e);
          }}
          onKeyUp={null}
          role="button"
          tabIndex="-1"
        ></div>
        <div className="booth-modal" role="dialog">
          <div className="booth-modal-actions">
            <button
              className="booth-modal-close-button"
              data-oepa={`Exhibitor Single | ${this.props.exhibitor} | Exhibitor Booth | ${this.props.modalFor} - Close`}
              onClick={(e) => {
                this.onClose(e);
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                />
              </svg>
            </button>
          </div>
          <div className="booth-modal-content">
            {this.props.content.match(/\.(jpeg|jpg|gif|png)$/) !== null ? (
              <img src={this.props.content} width="100%" alt="Booth Exhibit" />
            ) : this.props.content.match(/\.(mp4)$/) !== null ? (
              <div className="booth-video-container">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  preload="auto"
                  autoPlay
                  width="100%"
                  id="booth-video"
                  poster={`/images/video-posters/${this.props.modalID}.png`}
                  onPlay={() => {
                    this.playVideo();
                  }}
                  data-oepa={`Exhibitor Single | ${this.props.exhibitor} | Booth Video | ${this.props.content}`}
                >
                  <source src={this.props.content} type="video/mp4" />
                </video>
                <div className="play-overlay">
                  <button
                    onClick={() => {
                      this.playVideo();
                    }}
                  >
                    <svg viewBox="0 0 386.972 386.972">
                      <path
                        fill="currentColor"
                        d="M25.99 0v386.972l334.991-193.486L25.99 0zm30 51.972l245.009 141.514L55.99 335V51.972z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  exhibitor: PropTypes.string.isRequired,
};
