import React, { Component } from "react";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default class Modal extends Component {
  close = () => {
    this.props.close();
  };
  componentDidMount(){
    console.clear()
  }
  render() {
    return (
      <div>
        {this.props.show ? (
          <div className="modal-container" onClick={() => this.close()}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <header className="modal-header">
                <div className="modal-content-title-contain">
                  <span className="slash-modal">/ </span>
                  <div className="modal-content-title-wrapper">
                  <h1 className="modal-content-title">{this.props.movieTitle}</h1>
                  </div>
                  
                </div>
              </header>
              <main className="modal-content">
                <div className="modal-video">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${this.props.videoKey}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </main>
            </div>
            <span
                    className="episodes-close-button"
                    style={{ zIndex: "99" , bottom:'15px'}}
                    onClick={() => {
                      this.close();
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} className="episodes-close-icon" />
                  </span>
          </div>  
        ) : null}
      </div>
    );
  }
}
