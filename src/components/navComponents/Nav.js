import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import poster from "../../images/icons8-movie-100.png";
import { MenuItems } from "./MenuItems";
import "./nav.css";
import { bindActionCreators } from "redux";
import * as allData from "../../redux/actions/allData";
import * as searchAction from "../../redux/actions/searchAction";
import { connect } from "react-redux";
import logo from "../../images/logo.png";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cliked: false,
      searchCliked: false,
      searchContent: false,
      searchContentControl: 1,
      zIndex: 101,
      person: [],
      tv: [],
      movie: [],
    };
  }
  componentDidMount() {
    this.nav();
    console.clear();
  }
  handleClick = () => {
    this.setState({ cliked: !this.state.cliked });
  };
  searchHandleClick = () => {
    this.setState({ searchCliked: !this.state.searchCliked });
  };
  disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };
  enableScroll = () => {
    window.onscroll = function () {};
  };

  searchFunc = (e) => {
    this.props.action.getSearch(e.target.value);
    this.setState({ searchContentControl: e.target.value.length });
  };
  search = () => {
    return (
      <div>
        {this.state.searchContentControl > 1 || this.state.cliked
          ? this.disableScroll()
          : this.enableScroll()}
        {this.state.searchContentControl > 1 ? (
          <div className="search-content">
            <div className="search-content-wrapper">
              <div style={{ position: "relative" }}>
                <div className="line-wrapper">
                  <div className="line-text">
                    <span className="slash-title">/</span>
                    Movies
                  </div>
                  <div>
                    <div className="line-top"></div>
                    <div className="line-bottom"></div>
                  </div>
                </div>
                {this.props.search.map((e) => (
                  <div style={{ position: "relative" }}>
                    {e.media_type === "movie" ? (
                      <Link
                        to={
                          "/detail/" +
                          e.media_type +
                          "/" +
                          e.id +
                          "/" +
                          e.original_title.replace(/[#!$%^&*;:{}=`()]/g, "-")
                        }
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          this.searchHandleClick();
                          this.setState({
                            searchContentControl: 0,
                          });
                        }}
                      >
                        <div className="search-result-box">
                          {e.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                              className="search-result-poster"
                              alt={e.title}
                            />
                          ) : (
                            <img
                              src={poster}
                              className="search-result-poster"
                              alt="none"
                            />
                          )}
                          <div className="search-result-inf">
                            <p className="search-result-title">
                              {e.original_title}
                            </p>
                          </div>
                          {e.backdrop_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}
                              alt={e.title}
                              className="search-result-backdrop"
                            />
                          ) : null}
                        </div>
                      </Link>
                    ) : null}
                  </div>
                ))}

                <div
                  style={{
                    height: "90%",
                    width: "1px",
                    backgroundColor: "#b20000",
                    position: "absolute",
                    right: "0",
                    top: "5%",
                  }}
                ></div>
              </div>

              <div style={{ position: "relative" }}>
                <div className="line-wrapper">
                  <div className="line-text">
                    <span className="slash-title">/</span>
                    Tv Shows
                  </div>
                  <div>
                    <div className="line-top"></div>
                    <div className="line-bottom"></div>
                  </div>
                </div>

                {this.props.search.map((e) => (
                  <div style={{ position: "relative" }}>
                    {e.media_type === "tv" ? (
                      <Link
                        to={
                          "/detail/" +
                          e.media_type +
                          "/" +
                          e.id +
                          "/" +
                          e.original_name.replace(/[#!$%^&*;:{}=`()]/g, "-")
                        }
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          this.searchHandleClick();
                          this.setState({
                            searchContentControl: 0,
                          });
                        }}
                      >
                        <div className="search-result-box">
                          {e.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                              className="search-result-poster"
                              alt={e.title}
                            />
                          ) : (
                            <img
                              src={poster}
                              className="search-result-poster"
                              alt="none"
                            />
                          )}
                          <div className="search-result-inf">
                            <p className="search-result-title">
                              {e.original_name}
                            </p>
                          </div>
                          {e.backdrop_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}
                              alt={e.title}
                              className="search-result-backdrop"
                            />
                          ) : null}
                        </div>
                      </Link>
                    ) : null}
                  </div>
                ))}
                <div
                  style={{
                    height: "90%",
                    width: "1px",
                    backgroundColor: "#b20000",
                    position: "absolute",
                    right: "0",
                    top: "5%",
                  }}
                ></div>
              </div>
              <div style={{ position: "relative" }}>
                <div className="line-wrapper">
                  <div className="line-text">
                    <span className="slash-title">/</span>
                    Person
                  </div>
                  <div>
                    <div className="line-top"></div>
                    <div className="line-bottom"></div>
                  </div>
                </div>

                {this.props.search.map((e) => (
                  <div style={{ position: "relative" }}>
                    {e.media_type === "person" ? (
                      <Link
                        to={
                          "/person/" +
                          e.id +
                          "/" +
                          e.name.replace(/[#!$%^&*;:{}=`()]/g, "-")
                        }
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          this.searchHandleClick();
                          this.setState({
                            searchContentControl: 0,
                          });
                        }}
                      >
                        <div className="search-result-box">
                          {e.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/original/${e.profile_path}`}
                              className="search-result-poster"
                              alt={e.name}
                            />
                          ) : (
                            <img
                              src={poster}
                              className="search-result-poster"
                              alt="none"
                            />
                          )}
                          <div className="search-result-inf">
                            <p className="search-result-title">{e.name}</p>
                          </div>
                          {e.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                              alt={e.title}
                              className="search-result-person-backdrop"
                            />
                          ) : null}
                        </div>
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="search-shadow">
              <span
                className="search-close-button"
                onClick={() => {
                  this.searchHandleClick();
                  this.setState({
                    searchContentControl: 0,
                    searchCliked: false,
                    searchContent: false,
                  });
                }}
              >
                <FontAwesomeIcon icon={faTimes} className="search-close-icon" />
              </span>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  nav() {
    return (
      <div style={{ overflowX: "hidden" }}>
        <nav
          className="nav-items"
          style={{ zIndex: `${this.state.searchCliked ? "101" : "99"}` }}
        >
          <Link to="/">
            <img src={logo} alt="logo" className="logo"></img>
          </Link>
          <div className="mobile-button-position">
            <div
              className={
                this.state.searchCliked
                  ? "search-box search-box-active"
                  : "search-box"
              }
            >
              <input
                type="text"
                name="text"
                required
                autoComplete="off"
                className={
                  this.state.searchCliked
                    ? "input-search input-search-active"
                    : "input-search"
                }
                placeholder="Search"
                onChange={(e) => this.searchFunc(e)}
              />

              <FontAwesomeIcon
                onClick={this.searchHandleClick}
                icon={faSearch}
                className="search-button"
              ></FontAwesomeIcon>
            </div>

            <div className="menu-icon">
              <FontAwesomeIcon
                onClick={this.handleClick}
                icon={this.state.cliked ? faTimes : faBars}
              />
            </div>
          </div>
          <div className={this.state.cliked ? "nav-menu active" : "nav-menu"}>
            {MenuItems.map((elem) => (
              <div key={elem.description} style={{ marginTop: "3%" }}>
                <Link to={elem.path} style={{ textDecoration: "none" }}>
                  <div className="line-wrapper">
                    <div
                      className="line-text"
                      onClick={() => {
                        this.setState({
                          cliked: false,
                        });
                        this.props.action.changeLoadMore();
                      }}
                    >
                      <span className="slash-title">/</span>
                      <p className="nav-pointer">{elem.title}</p>
                    </div>
                    <div>
                      <div className="line-top"></div>
                      <div className="line-bottom"></div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </nav>
        {this.search()}
      </div>
    );
  }
  render() {
    return <div>{this.nav()}</div>;
  }
}
function mapStateToProps(state) {
  return {
    loadMore: state.loadMoreReducer,
    search: state.searchReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      changeLoadMore: bindActionCreators(allData.changeLoadMore, dispatch),
      getSearch: bindActionCreators(searchAction.search, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
