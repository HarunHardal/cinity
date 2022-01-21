import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as recommendationAction from "../../redux/actions/recommendationAction";
import "./recommendation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class RecommendationTv extends Component {
  componentDidMount() {
    this.randomNumber();
    console.clear()
  }
  constructor(props) {
    super(props);
    this.state = {
      Movies: [],
      count: 0,
      name: "",
      genres: [],
      overview: "",
      poster: "",
      backdrop: "",
    };
  }

  randomNumber = () => {
    let randomPage = Math.floor(Math.random() * 111);
    let randomMovie = Math.floor(Math.random() * 19);
    this.props.action.getRecomendationTv(randomMovie, randomPage);
  };

  Movie = function (name, genres, overview, poster, backdrop) {
    this.name = name;
    this.genres = genres;
    this.overview = overview;
    this.poster = poster;
    this.backdrop = backdrop;
  };
  data = () => {
    let oldData = new this.Movie(
      this.props.recommendationTv.name,
      this.props.recommendationTv.genres,
      this.props.recommendationTv.overview,
      this.props.recommendationTv.poster_path,
      this.props.recommendationTv.backdrop_path
    );

    return oldData;
  };

  genres = () => {
    let genresName;
    if (this.state.count === this.state.Movies.length) {
      genresName = this.props.recommendationTv.genres || [];
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
  overview = (useWordBoundary) => {
    let text;
    if (this.state.count === this.state.Movies.length) {
      text = this.props.recommendationTv.overview || "";
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
      id = this.props.recommendationTv.id || "";
      title = this.props.recommendationTv.name || "";
    } else {
      id = this.state.id;
      title = this.state.name;
    }
    return (
      <div className="overview recommendation-text">
        <Link to={`/detail/${"tv"}/${id}/${title}`} style={{textDecoration:'none'}}>
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
              ? this.props.recommendationTv.poster_path
              : this.state.poster
          }`}
          alt="poster"
        ></img>
        <span className="recommendation-line"></span>
        <div className="recommendation-info-wrapper">
          <h1 className="recommendation-title">
            {this.state.count === this.state.Movies.length
              ? this.props.recommendationTv.name
              : this.state.name}
          </h1>
          <div className="recommendation-genre-wrapper">{this.genres()}</div>
          <div className="overview-wrapper">
            <div className="overview">{this.overview()}</div>
          </div>
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
              <p className="line-text">TV Recommendations</p>
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
                ? this.props.recommendationTv.backdrop_path
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
                  name: this.state.Movies[this.state.count].name,
                  genres: this.state.Movies[this.state.count].genres,
                  overview: this.state.Movies[this.state.count].overview,
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
                  name: this.state.Movies[this.state.count - 1].name,
                  genres: this.state.Movies[this.state.count - 1].genres,
                  overview: this.state.Movies[this.state.count - 1].overview,
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
    recommendationTv: state.recommendationTvReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      getRecomendationTv: bindActionCreators(
        recommendationAction.recomendationTV,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationTv);
