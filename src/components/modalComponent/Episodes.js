import React, { Component } from "react";
import "./episodes.css";
import * as detailAction from "../../redux/actions/detailAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Episodes extends Component {
  constructor() {
    super();
    this.state = {
      handleClick: false,
      seasonName: "Select Season",
      seasonNumber: "",
      dfltbg: "",
      episodes: [],
    };
  }
  componentDidMount() {
    console.clear()
  }
  close = () => {
    this.props.close();
  };
  handleClick = () => {
    this.setState({
      handleClick: !this.state.handleClick,
    });
  };
  poster = () => {
    if (this.props.season.poster_path === undefined) {
      return `https://image.tmdb.org/t/p/original${this.props.mainPoster} `;
    } else if (this.state.seasonNumber === "") {
      return `https://image.tmdb.org/t/p/original${this.props.mainPoster} `;
    } else {
      return `https://image.tmdb.org/t/p/original${this.props.season.poster_path} `;
    }
  };
  render() {
    //Redux
    const a = this.props.season || {};
    const episodes = a.episodes || [];
    return (
      <div>
        {this.props.show ? (
          <div className="episodes-container">
            <main className="episodes-main">
              <div className="season-poster-wrapper">
                <img className="season-poster" src={this.poster()} alt="a" />
              </div>
              <div>
                <div
                  className={
                    this.state.handleClick
                      ? "season-select-box season-select-box-active"
                      : "season-select-box"
                  }
                  onClick={() => {
                    this.handleClick();
                  }}
                >
                  <p className="seasons-name">{this.state.seasonName}</p>
                </div>
                <div
                  onClick={() => {
                    this.handleClick();
                  }}
                  className={
                    this.state.handleClick
                      ? "season-names  season-names-active"
                      : "season-names "
                  }
                >
                  <ul>
                    {this.props.seasonsArray.map((e,i) => (
                      <li
                      key={i}
                        className="seasons-name"
                        onClick={() => {
                          this.handleClick();
                          this.setState({
                            seasonName: e.name,
                            seasonNumber: e.season_number,
                          });
                          this.props.action.getSeasonDetail(
                            this.props.id,
                            e.season_number
                          );
                        }}
                      >
                        {e.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="episodes-wrapper">
                  {episodes.map((e,i) => (
                    <div key={i} className="episodes">
                      {e.still_path ? (
                        <img
                          className="episodes-bg"
                          src={`https://image.tmdb.org/t/p/original/${e.still_path}`}
                          alt=""
                        />
                      ) : null}

                      <div className="episode-info-container">
                        <section className="info-header">
                          <h2 className="episode-title">{e.name}</h2>
                          <p className="episode-date date">{e.air_date}</p>
                        </section>
                        <section className="info-main">
                          <p className="episode-text">{e.overview}</p>
                        </section>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>

            <span
              className="episodes-close-button"
              style={{ zIndex: "99" }}
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

function mapStateToProps(state) {
  return {
    season: state.seasonReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      getSeasonDetail: bindActionCreators(detailAction.seasons, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
