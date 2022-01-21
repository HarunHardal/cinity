import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import "./watchList.css";
import * as watchlistAction from "../../redux/actions/watchListAction";
import { Link } from "react-router-dom";
class Watchlist extends Component {
  componentDidMount() {
    console.clear()
  }

  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  arrayData = JSON.parse(localStorage.getItem("data")) || [];
  delete = (i, p) => {
    this.arrayData.splice(i, 1);
    window.localStorage.setItem("data", JSON.stringify(this.arrayData));
    window.location.reload();
  };

  render() {
    return (
      <div className="watchlist-container">
        <div className="watchlist-header">
          <div className="watchlist-title-wrapper">
            <h1 style={{marginTop:'-1%'}} className="all-data-title">Watch List</h1>
          </div>
          <div className="watchlist-header-button-wrapper">
            <button
              type="button"
              className="button"
              onClick={() => {localStorage.clear();window.location.reload();}}
            >
              DELETE ALL LIST
            </button>
          </div>
        </div>
        <div className="watchlist-container-wrapper">
          {this.arrayData.map((e, i) => (
            <div>
              <Link
                to={`/detail/${e.type}/${e.id}/${e.title}`}
                style={{ textDecoration: "none" }}
              >
                <div className="watchlist-content-wrapper">
                  <div className="watchlist-content">
                    <div className="watchlist-poster-wrapper">
                      <img
                        className="watchlist-poster"
                        src={`https://image.tmdb.org/t/p/w500/${e.poster}`}
                        alt={e.id}
                      />
                    </div>
                    <div>
                      <h2 className="watchlist-title">{e.title}</h2>
                      <div>
                        {e.genres.map((e) => (
                          <div className="recommendation-genre-name recommendation-text">
                            {e.name}
                          </div>
                        ))}
                      </div>

                      <img
                        className="watchlist-bg"
                        src={`https://image.tmdb.org/t/p/w500/${e.bg}`}
                        alt={e.id}
                      />
                    </div>
                  </div>
                </div>
              </Link>
              <button
                type="button"
                className="button watchlist-button"
                onClick={() => {
                  this.delete(i);
                }}
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
        {this.arrayData.length === 0 ? (
          <div className="empty-wrapper">
            <p className="empty-text">LIST EMPTY</p>
          </div>
        ) : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    watchlist: state.watchListReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      getwatchlist: bindActionCreators(watchlistAction.watchlist, dispatch),
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Watchlist)
);
