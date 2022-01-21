import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as allData from "../../redux/actions/allData";
import "./allMovies.css";
import { MovieCategoryList } from "./MovieCategoryList";
import { TvGenreList } from "./TvGenreList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

class AllMoviesComponent extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      options: {
        root: null,
        rootMargin: "100px",
        threshold: 0,
      },
      loader: React.createRef(null),
      categotyName: "",
      enter: false,
      selectGenre: "Select Genre",
      genreId: "popular",
      genreList: [],
      cliked: false,
      mediaType: "",
      control: true,
    };
  }
  componentDidMount() {
    console.clear()
    const type = this.props.match.params;
    const mediaType = type.type;
    this.setState({
      mediaType: mediaType,
    });
    this.observer();
    this.mediaType();
  }
  componentDidUpdate() {}
  handleClick = () => {
    this.setState({ cliked: !this.state.cliked });
  };
  mediaType = () => {
    const type = this.props.match.params;
    const mediaType = type.type;
    if (mediaType === "tv") {
      this.setState({
        genreList: TvGenreList,
      });
    } else {
      this.setState({
        genreList: MovieCategoryList,
      });
    }
    this.setState({
      mediaType: mediaType,
    });
    return mediaType;
  };
  observer = () => {
    let observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      this.state.options
    );
    if (this.state.loader.current) {
      observer.observe(this.state.loader.current);
    }
  };
  handleObserver = (entities) => {
    const target = entities[0];
    const loadTime =
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;
    if (target.isIntersecting) {
      this.setState({
        page: this.state.page + 1,
      });
      if (this.state.control !== true) {
        this.props.action.getAllData(
          this.mediaType(),
          this.state.genreId,
          this.state.page,
          this.state.control
        );
        setTimeout(
          () => {
            this.props.allData.map((e) => {
              this.props.action.loadMore(e);
            });
          },
          loadTime < 0 ? window.performance.now()+5000 : loadTime
        );
      } else {
        this.props.action.getAllData(
          this.mediaType(),
          this.state.genreId,
          this.state.page,
          this.state.control
        );
        setTimeout(
          () => {
            this.props.allData.map((e) => {
              this.props.action.loadMore(e);
            });
          },
          loadTime < 0 ? 5000 : loadTime
        );
      }
    }
  };
  handleEnter = () => {
    this.setState({ enter: !this.state.enter });
  };
  render() {
    return (
      <div className="all-data-container">   {}
        <span className="all-data-contents-top-shadow"></span>
        <div className="all-data-nav">       {}
          <h1 className="all-data-title">{this.state.mediaType}</h1>

          <div className="custom-select-box">
            <button
              type="button"
              className="button "
              onClick={() => {
                this.handleClick();
              }}
            >
              {this.state.selectGenre}
            </button>
          </div>
          {
            <div
              className={
                this.state.cliked
                  ? "all-data-categories all-data-categories-active"
                  : "all-data-categories"
              }
            >
              <ul>
                {this.state.genreList.map((e) => (
                  <li
                    key={e.alt}
                    onClick={() => {
                      this.props.action.changeLoadMore();
                      if (!e.id) {
                        this.setState({
                          selectGenre: e.title,
                          page: 0,
                          genreId: e.description,
                          control: true,
                        });
                      } else {
                        this.setState({
                          selectGenre: e.title,
                          page: 0,
                          genreId: e.id,
                          control: false,
                        });
                      }
                      this.handleClick();
                    }}
                  >
                    {e.title}
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
        <div className="all-data-contents-wrapper">
          <div className="all-data-contents-container">
            {this.props.loadMore.map((e, i) => (
              <Link
                to={
                  "/detail/" +
                    this.state.mediaType +
                    "/" +
                    e.id +
                    "/" +
                    e.title || e.name
                }
                style={{ textDecoration: "none" }}
                key={i}
              >
                <div className="all-data-contents-poster-container">
                  <div className="all-data-contents-poster-wrapper">
                    <img
                      className="all-data-contents-poster"
                      src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                      alt="a"
                    />
                  </div>
                  <p
                    style={{
                      color: "white",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    {e.title || e.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div
            className="all-data-contents-loading-wrapper"
            ref={this.state.loader}
          >
            <div className="all-data-contents-loading">
              <span>L</span>
              <span>O</span>
              <span>A</span>
              <span>D</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allData: state.allDataReducer,
    loadMore: state.loadMoreReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      getAllData: bindActionCreators(allData.allData, dispatch),
      loadMore: bindActionCreators(allData.loadMore, dispatch),
      changeLoadMore: bindActionCreators(allData.changeLoadMore, dispatch),
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllMoviesComponent)
);
