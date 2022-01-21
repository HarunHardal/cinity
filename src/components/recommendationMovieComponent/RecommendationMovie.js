import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as recommendationAction from "../../redux/actions/recommendationAction";
import "./recommendation.css";

class RecommendationMovie extends Component {
  componentDidMount() {
    this.randomNumber();
    console.clear()
  }
  constructor(props) {
    super(props);
    this.state = {
      Movies: [],
      count: 0,
      id: "",
      title: "",
      genres: [],
      time: "",
      overview: "",
      director: [],
      poster: "",
      backdrop: "",
    };
  }

  randomNumber = () => {
    let randomPage = Math.floor(Math.random() * 457);
    let randomMovie = Math.floor(Math.random() * 19);
    this.props.action.getRecomendationMovie(randomMovie, randomPage);
  };

  Movie = function (
    id,
    title,
    genres,
    time,
    overview,
    director,
    poster,
    backdrop
  ) {
    this.id = id;
    this.title = title;
    this.genres = genres;
    this.time = time;
    this.overview = overview;
    this.director = director;
    this.poster = poster;
    this.backdrop = backdrop;
  };
  data = () => {
    let oldData = new this.Movie(
      this.props.recommendationInfo.id,
      this.props.recommendationInfo.title,
      this.props.recommendationInfo.genres,
      this.props.recommendationInfo.runtime,
      this.props.recommendationInfo.overview,
      this.props.recommendationInfo.credits,
      this.props.recommendationInfo.poster_path,
      this.props.recommendationInfo.backdrop_path
    );

    return oldData;
  };

  genres = () => {
    let genresName;
    if (this.state.count === this.state.Movies.length) {
      genresName = this.props.recommendationInfo.genres || [];
    } else {
      genresName = this.state.genres;
    }
    return (
      <div>
        {genresName.map((e) => (
          <div
            className="recommendation-genre-name recommendation-text"
            key={e.name}
          >
            {e.name}
          </div>
        ))}
      </div>
    );
  };
  runTime = () => {
    const runtime = this.props.recommendationInfo.runtime;
    const hours = runtime / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    this.state.time = rhours + "h " + rminutes + "m";
    return (
      <p className="runtime recommendation-text">
        {rhours + "h " + rminutes + "m"}
      </p>
    );
  };
  credits = () => {
    let directing;
    if (this.state.count === this.state.Movies.length) {
      const director = this.props.recommendationInfo.credits || [];
      const crew = director.crew || [];
      const result = crew.find((e) => e.department === "Directing") || {};
      directing = result.original_name;
    } else {
      const director = this.state.director || [];
      const crew = director.crew || [];
      const result = crew.find((e) => e.department === "Directing") || {};
      directing = result.original_name;
    }
    return this.state.director.length === 0 ? null : (
      <p className="director-name recommendation-text">
        director <span className="colon">:</span> {directing}
      </p>
    );
  };
  overview = (useWordBoundary) => {
    let text;
    if (this.state.count === this.state.Movies.length) {
      text = this.props.recommendationInfo.overview || "";
    } else {
      text = this.state.overview;
    }
    if (text.length <= 250) {
      return text;
    }
    const subString = text.substr(0, 249);
    const trimmed = subString.substr(
      0,
      Math.min(subString.length, subString.lastIndexOf(" "))
    );

    return (
      <div className="overview recommendation-text">
        {(useWordBoundary
          ? subString.substr(0, subString.lastIndexOf("."))
          : trimmed) + " ..."}
      </div>
    );
  };
  detailButton = () => {
    let id;
    let title;
    if (this.state.count === this.state.Movies.length) {
      id = this.props.recommendationInfo.id || "";
      title = this.props.recommendationInfo.title || "";
    } else {
      id = this.state.id;
      title = this.state.title;
    }
    return (
      <div className="overview recommendation-text">
        <Link to={`/detail/${"movie"}/${id}/${title}`} style={{textDecoration:'none'}}>
          <button type="button" className="button">
            <span>Go Detail</span>
          </button>
        </Link>
      </div>
    );
  };
  recommendation = () => {
    return (
      <div className="recommendation-wrapper">
        <img
          className="recommendation-poster"
          src={`https://image.tmdb.org/t/p/w500/${
            this.state.count === this.state.Movies.length
              ? this.props.recommendationInfo.poster_path
              : this.state.poster
          }`}
          alt="poster"
        ></img>
        <span className="recommendation-line"></span>
        <div className="recommendation-info-wrapper">
          <h1 className="recommendation-title">
            {this.state.count === this.state.Movies.length
              ? this.props.recommendationInfo.title
              : this.state.title}
          </h1>
          <div className="recommendation-genre-wrapper">{this.genres()}</div>
          <div className="runtime-wrapper">{this.runTime()}</div>
          <div className="overview-wrapper">
            <div className="overview">{this.overview()}</div>
          </div>
          <div className="director-name-wrapper">{this.credits()}</div>
          <div className="button-wrapper">{this.detailButton()}</div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div style={{ position: "relative", padding: "100px 0" }}>
        <div className="title-wrapper">
          <div className="line-wrapper">
            <div>
              <p className="line-text">Movie Recommendations</p>
            </div>
            <div>
              <div className="line-top"></div>
              <div className="line-bottom"></div>
            </div>
          </div>
        </div>
        <div className="recommendation-component">
          <div className="recommendation-left-shadow"></div>
          <div className="recommendation-top-shadow"></div>
          <div className="recommendation-bottom-shadow"></div>
          <img
            className="recommendation-background"
            src={`https://image.tmdb.org/t/p/original/${
              this.state.count === this.state.Movies.length
                ? this.props.recommendationInfo.backdrop_path
                : this.state.backdrop
            }`}
            alt="poster"
          ></img>
          <button
            type="button"
            style={{ zIndex: "5" }}
            className="recommendatino-next"
            aria-label="Next"
            onClick={() => {
              if (this.state.count === this.state.Movies.length) {
                this.randomNumber();
                this.setState({
                  Movies: [...this.state.Movies, this.data()],
                  count: this.state.count + 1,
                });
              } else {
                this.setState({
                  count: this.state.count + 1,
                  id: this.state.Movies[this.state.count].id,
                  title: this.state.Movies[this.state.count].title,
                  genres: this.state.Movies[this.state.count].genres,
                  time: this.state.Movies[this.state.count].time,
                  overview: this.state.Movies[this.state.count].overview,
                  director: this.state.Movies[this.state.count].director,
                  poster: this.state.Movies[this.state.count].poster,
                  backdrop: this.state.Movies[this.state.count].backdrop,
                });
              }
            }}
          >
            <span aria-hidden={true}>&#8250;</span>
          </button>
          {this.state.count === 0 ? null : (
            <button
              type="button"
              className="recommendatino-prev"
              aria-label="Previous"
              onClick={() => {
                this.setState({
                  count: this.state.count - 1,
                  id: this.state.Movies[this.state.count - 1].id,
                  title: this.state.Movies[this.state.count - 1].title,
                  genres: this.state.Movies[this.state.count - 1].genres,
                  time: this.state.Movies[this.state.count - 1].time,
                  overview: this.state.Movies[this.state.count - 1].overview,
                  director: this.state.Movies[this.state.count - 1].director,
                  poster: this.state.Movies[this.state.count - 1].poster,
                  backdrop: this.state.Movies[this.state.count - 1].backdrop,
                });
              }}
            >
              <span aria-hidden={true}>&#8249;</span>
            </button>
          )}
          {this.recommendation()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recommendationInfo: state.recommendationMovieReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      getRecomendationMovie: bindActionCreators(
        recommendationAction.getRecomendationMovies,
        dispatch
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationMovie);
