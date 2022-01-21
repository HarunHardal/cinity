import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as popularMoviesAction from "../../redux/actions/popularMoviesOfTheDay";
import * as popularTvShowsAction from "../../redux/actions/popularTvShowsOfTheDay";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../../../node_modules/swiper/components/navigation/navigation.min.css";
import "../../../node_modules/swiper/components/pagination/pagination.min.css";
import SwiperCore, { Navigation } from "swiper";
import "./popular.css";
import { Link, withRouter } from "react-router-dom";
SwiperCore.use([Navigation]);

class Popular extends Component {
  componentDidMount() {
    this.props.action.getPopularMovies();
    this.props.action.getPopularTvShows();
    console.clear();
  }
  type = (val) => {
    return val === "movie" ? "movie" : "tv";
  };
  render() {
    return (
      <div className="popular-container">
        <div className="title-wrapper">
          <div className="line-wrapper">
            <div className="line-text">Popular Movies of the Day</div>
            <div>
              <div className="line-top"></div>
              <div className="line-bottom"></div>
            </div>
          </div>
        </div>
        <Swiper
          spaceBetween={50}
          slidesPerView={5}
          navigation
          observer={true}
          observeParents={true}
          loop={true}
          className="swiper"
        >
          {this.props.popularMoviesInfo.map((e, i) => (
            <SwiperSlide className="swiper-slide" key={i}>
              <Link
                to={
                  "/detail/" +
                  this.type("movie") +
                  "/" +
                  e.id +
                  "/" +
                  e.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                }
                style={{ textAlign: "center", textDecoration: "none" }}
              >
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                ></img>
                <span className="content-name2">{e.name || e.title}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="brace-"></div>
        <div className="title-wrapper">
          <div className="line-wrapper">
            <div className="line-text">Popular Tv Shows of the Day</div>
            <div>
              <div className="line-top"></div>
              <div className="line-bottom"></div>
            </div>
          </div>
        </div>
        <Swiper
          spaceBetween={50}
          slidesPerView={5}
          navigation
          observer={true}
          observeParents={true}
          loop={true}
          className="swiper"
        >
          {this.props.popularTvShowsInfo.map((e, i) => (
            <SwiperSlide className="swiper-slide" key={i}>
              <Link
                to={
                  "detail/" +
                  this.type("tv") +
                  "/" +
                  e.id +
                  "/" +
                  e.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                }
                style={{ textAlign: "center", textDecoration: "none" }}
              >
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                ></img>
                <span className="content-name2">{e.name || e.title}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    popularMoviesInfo: state.popularMoviesReducer,
    popularTvShowsInfo: state.popularTvShowsReducer,
  };
}
function mapDispatchToProps(dispacth) {
  return {
    action: {
      getPopularMovies: bindActionCreators(
        popularMoviesAction.getPopularMoviesOfTheDay,
        dispacth
      ),
      getPopularTvShows: bindActionCreators(
        popularTvShowsAction.getPopularTvShowsOfTheDay,
        dispacth
      ),
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Popular)
);
