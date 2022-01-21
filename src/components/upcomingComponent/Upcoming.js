/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as upcomingAction from "../../redux/actions/upcomingAction";
import "./upcoming.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Navigation } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modalComponent/Modal";

SwiperCore.use([Navigation]);
class Upcoming extends Component {
  componentDidMount() {
    this.props.action.upcomingTrailers();
    this.props.action.upcomingTrailersDefaultUrl();
    console.clear()
  }
  constructor(props) {
    super(props);
    this.state = {
      mouseEnter: true,
      url: "",
      title: "",
      overview: "",
      isLoaded: false,
      hover: false,
      modal: false,
      videoId: "",
    };
  }
  overview = () => {
    const text = this.state.overview;
    if (text.length <= 200) {
      return text;
    }
    const subString = text.substr(0, 199);
    const trimmed = subString.substr(
      0,
      Math.min(subString.length, subString.lastIndexOf(" "))
    );
    return trimmed + " ...";
  };
  bg = () => {
    return (
      <div style={{ margin: "50px 0", position: "relative" }}>
        <div className="upcoming-trailers-shadow"></div>
        <div className="upcoming-trailers-bottom-shadow"></div>
        <div className="denemeda">
          <div className="upcoming-trailers-title-wrapper">
            <h1 className="upcoming-trailers-title">{this.state.title}</h1>
          </div>
          <div className="upcoming-trailers-overview-wrapper">
            {this.overview()}
          </div>
        </div>

        <img
          className={
            this.state.hover
              ? "upcoming-trailers-background upcoming-trailers-background-fade"
              : "upcoming-trailers-background"
          }
          style={{}}
          src={`https://image.tmdb.org/t/p/original/${
            this.state.isLoaded
              ? this.state.url
              : this.props.upcomingTrailersDefaultUrl
          }`}
        ></img>
      </div>
    );
  };

  slider = () => {
    return (
      <div className="upcoming-trailers-contain">
        <div>{this.bg()}</div>
        <Swiper
          slidesPerView={3}
          observer={true}
          observeParents={true}
          spaceBetween={-100}
          loop={true}
          navigation
          className="upcoming-trailers-slider"
        >
          {this.props.upcomingTrailerInfo.map((e) => (
            <SwiperSlide key={e.title} className="upcoming-trailers-slides">
              <img
                className="upcoming-trailers-slides-poster"
                onMouseEnter={() => {
                  this.setState({
                    url: e.backdrop_path,
                    title: e.title,
                    overview: e.overview,
                    isLoaded: true,
                    hover: true,
                  });
                  this.props.action.getVideoAction("movie", e.id);
                }}
                onClick={() => {
                  this.setState({
                    url: e.backdrop_path,
                    title: e.title,
                    overview: e.overview,
                    isLoaded: true,
                    hover: true,
                    modal: true
                  });
                  this.props.action.getVideoAction("movie", e.id);
                }}
                onMouseLeave={() => {
                  this.setState({
                    hover: false,
                  });
                }}
                src={`https://image.tmdb.org/t/p/original/${e.poster_path}`}
              />

              <FontAwesomeIcon
                onClick={() => {
                  this.setState({
                    url: e.backdrop_path,
                    title: e.title,
                    overview: e.overview,
                    isLoaded: true,
                    hover: true,
                    modal: true
                  });
                  this.props.action.getVideoAction("movie", e.id);
                }}
                className="upcoming-trailers-playBtn"
                icon={faPlay}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  close = () => {
    this.setState({
      modal: false,
    });
  };
  render() {
    return (
      <div>
        <Modal
          show={this.state.modal}
          close={this.close}
          videoKey={this.props.getVideoReducer}
          movieTitle={this.state.title}
        />
        <div className="upcoming-component">
          <div className="line-wrapper">
            <div className="line-text">Upcoming Tailers</div>
            <div>
              <div className="line-top"></div>
              <div className="line-bottom"></div>
            </div>
          </div>
          <div>{this.slider()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    upcomingTrailerInfo: state.upcomingTrailersReducer,
    upcomingTrailersDefaultUrl: state.upcomingTrailersDefaultUrlReducer,
    getVideoReducer: state.getVideoReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      upcomingTrailers: bindActionCreators(
        upcomingAction.getUpcomingTrailers,
        dispatch
      ),
      upcomingTrailersDefaultUrl: bindActionCreators(
        upcomingAction.getUpcomingTrailersDefaultUrl,
        dispatch
      ),
      getVideoAction: bindActionCreators(upcomingAction.getVideo, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Upcoming);
