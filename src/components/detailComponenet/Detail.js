import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as detailAction from "../../redux/actions/detailAction";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/components/navigation/navigation.min.css";
import "../../../node_modules/swiper/components/pagination/pagination.min.css";
import SwiperCore, { Navigation } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faAngleRight,
  faAngleLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import profile from "../../images/icons8-user-90.png";
import "./detail.css";
import Modal from "../modalComponent/Modal";
import Episodes from "../modalComponent/Episodes";
import { Link, withRouter } from "react-router-dom";
import SaveDataToLocalStorage from "../localStorageService/saveDataToLocalStorage";
SwiperCore.use([Navigation]);

class Detail extends Component {
  componentDidMount() {
    console.clear()
    window.addEventListener("scroll", this.scrollFun);
    const type = this.props.match.params;
    const mediaType = type.type;
    const typeId = type.id;
    const seasons = this.props.detail.seasons || [];

    this.setState({
      id: typeId,
    });

    this.props.action.getDetail(mediaType, typeId);
    window.scrollTo(0, 0);
    mediaType === "tv"
      ? this.props.action.getDetail(mediaType, typeId, "seasons")
      : this.props.action.getDetail(mediaType, typeId);

    seasons.map((e) => {
      this.state.season.seasonNumbers.push(e.season_number);
      this.state.season.seasonName.push(e.season_name);
      this.state.season.seasonPoster.push(e.poster_path);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      episodes: false,
      season: {
        seasonNumbers: [],
        seasonName: [],
        seasonPoster: [],
        seasonOverview: [],
      },
      videoId: "",
      title: "",
      modalImage: false,
      count: "",
      overView: "",
      seasonsClick: false,
      seasonPoster: "",
      loading: false,
      pageY: 0,
      id: "",
      bg: "",
      poster: "",
      genres: [],
      wTitle: "",
    };
  }

  scrollFun = (e) => {
    let scrollTop = window.pageYOffset;
    let itemTranslate = Math.floor(scrollTop / 7);

    this.setState({
      pageY: itemTranslate,
    });
  };
  close = () => {
    this.setState({
      modal: false,
      episodes: false,
    });
  };
  type = () => {
    const type = this.props.detail || [];
    if (type.seasons) {
      return "tv";
    } else {
      return "movie";
    }
  };
  runTime = () => {
    let rhours, rminutes;
    if (this.props.detail.runtime === undefined) {
      return (
        <div className="timeline-wrapper">
          <p className="detail-text detail-date">
            {this.props.detail.first_air_date}
          </p>
        </div>
      );
    } else {
      const runtime = this.props.detail.runtime;
      const hours = runtime / 60;
      rhours = Math.floor(hours);
      const minutes = (hours - rhours) * 60;
      rminutes = Math.round(minutes);
      return (
        <div className="timeline-wrapper">
          <p className="detail-date detail-text">
            {this.props.detail.release_date}
          </p>
          <p className="detail-runtime detail-text">
            {rhours + "h " + rminutes + "m"}
          </p>
        </div>
      );
    }
  };
  credits = () => {
    if (this.props.detail.credits === undefined) {
      return null;
    } else {
      const director = this.props.detail.credits || [];
      const crew = director.crew || [];
      const directorName = crew.find((e) => e.department === "Directing") || {};
      const writerName = crew.find((e) => e.department === "Writing") || {};
      return (
        <div className="detail-crew-wrapper">
          <p className="detail-crew detail-text">
            {directorName.original_name === undefined
              ? null
              : "Director: " + directorName.original_name}
          </p>
          <p className="detail-crew detail-text">
            {writerName.original_name === undefined
              ? null
              : "Writer: " + writerName.original_name}
          </p>
        </div>
      );
    }
  };

  modalImage = () => {
    const images = this.props.detail.images || {};
    const backdrops = images.backdrops || [];

    const url = backdrops[this.state.count] || "";

    return (
      <div>
        {this.state.modalImage ? (
          <div className="modal-container">
            <div className="modal">
              <header className="modal-header"></header>
              <main className="modal-content">
                {backdrops.length === this.state.count + 1 ? null : (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    onClick={() =>
                      this.setState({ count: this.state.count + 1 })
                    }
                    className="modal-image-next"
                  />
                )}
                {this.state.count === 0 ? null : (
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    onClick={() =>
                      this.setState({ count: this.state.count - 1 })
                    }
                    className="modal-image-prev"
                  />
                )}

                <img
                  src={`https://image.tmdb.org/t/p/original${url.file_path}`}
                  alt=""
                  className="modal-img"
                />
              </main>
            </div>
            <span
              className="episodes-close-button"
              style={{ zIndex: "99", bottom: "15px" }}
              onClick={() =>
                this.setState({
                  modalImage: false,
                })
              }
            >
              <FontAwesomeIcon icon={faTimes} className="episodes-close-icon" />
            </span>
          </div>
        ) : null}
      </div>
    );
  };

  detail = () => {
    return;
  };
  render() {
    const genres = this.props.detail.genres || [];
    const cast = this.props.detail.credits || {};
    const castList = cast.cast || [];

    const video = this.props.detail.videos || {};
    const videoList = video.results || [];
    const getVideo = videoList[0] || {};
    const videoKey = getVideo.key || "";

    const images = this.props.detail.images || {};
    const backdrops = images.backdrops || [];

    const similars = this.props.detail.similar || {};
    const similarList = similars.results || [];

    const seasons = this.props.detail.seasons || [];
    const dfltSeason = seasons[0] || {};

    setTimeout(() => {
      this.setState({
        loading: true,
      });
    }, window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart);
    return (
      <div className="detail-margin">
        <Modal
          show={this.state.modal}
          close={this.close}
          videoKey={videoKey}
          movieTitle={this.state.title}
        />
        <Episodes
          show={this.state.episodes}
          close={this.close}
          seasonsArray={seasons}
          dfltSeason={dfltSeason}
          id={this.state.id}
          mainPoster={this.props.detail.poster_path}
        />
        <div className="detail-bg-wrapper">
          {this.state.loading ? (
            <img
              className="detail-bg"
              style={{ transform: `translateY(-${this.state.pageY}px)` }}
              src={`https://image.tmdb.org/t/p/original/${this.props.detail.backdrop_path}`}
              alt="mainBackground"
              onLoad={() => {
                this.setState({
                  bg: this.props.detail.backdrop_path,
                });
              }}
            />
          ) : (
            <div className="all-data-contents-loading-wrapper">
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
          )}

          <div className="detail-shadow"></div>
        </div>
        <div className="detail-position">
          <div className="detail-content-wrapper">
            <div className="detail-poster-wrapper">
              <img
                className="detail-poster"
                src={`https://image.tmdb.org/t/p/w500/${this.props.detail.poster_path}`}
                alt="poster"
                onLoad={() => {
                  this.setState({
                    poster: this.props.detail.poster_path,
                  });
                }}
              />
              <FontAwesomeIcon
                icon={faPlayCircle}
                className="detail-playBtn"
                onClick={() => {
                  this.setState({
                    videoId: getVideo.key,
                    modal: true,
                    title: this.props.detail.title || this.props.detail.name,
                  });
                }}
              />
            </div>
            <div className="detail-info-wrapper">
            <div className="detail-line-text">
                <span className="slash-title">/</span>
                <h1
                className="detail-title"
              >
                {this.props.detail.title || this.props.detail.name}
              </h1>
              </div>


             

              {this.runTime()}

              <div className="detail-button-wrapper">
                <button
                  type="button"
                  className="button detail-btn"
                  onClick={() => {
                    this.setState({
                      wTitle: "",
                    });
                    SaveDataToLocalStorage(
                      this.type(),
                      this.props.detail.id,
                      this.props.detail.backdrop_path,
                      this.props.detail.poster_path,
                      this.props.detail.title || this.props.detail.name,
                      this.props.detail.genres
                    );
                  }}
                >
                  <span>Add to Watchlist</span>
                </button>
                {this.type() === "tv" ? (
                  <button
                    type="button"
                    className="button detail-btn"
                    onClick={() => {
                      this.props.action.getSeasonDetail(this.state.id, 1);
                      this.setState({
                        episodes: true,
                      });
                    }}
                  >
                    <span> EPİSODES</span>
                  </button>
                ) : null}
              </div>
              <div className="detail-genre-wrapper">
                {genres.map((e, i) => (
                  <div
                    key={i}
                    className="detail-genre detail-text"
                    onLoad={() => {
                      this.setState({ genres: [e.name] });
                    }}
                  >
                    {e.name}
                  </div>
                ))}
              </div>

              <div className="detail-overview-wrapper">
                <p className="detail-overview detail-text">
                  {this.props.detail.overview}
                </p>
              </div>
              <div>{this.credits()}</div>
            </div>
          </div>
          {castList.length !== 0 ? (
            <div className="cast-wrapper">
              <div className="line-wrapper title-margin">
                <div className="line-text">
                  Cast
                </div>
                <div>
                  <div className="line-top"></div>
                  <div className="line-bottom"></div>
                </div>
              </div>
              <Swiper
                slidesPerView={5}
                spaceBetween={0}
                pagination={{ clickable: true }}
                navigation
                observer={true}
                observeParents={true}
                loop={true}
              >
                {castList.map((e) => (
                  <SwiperSlide className="detail-cast-slide" key={e.name}>
                    <Link
                      to={
                        "/person/" +
                        e.id +
                        "/" +
                        e.name.replace(/[#!$%^&*;:{}=`()]/g, "-")
                      }
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "red",
                      }}
                    >
                      {e.profile_path ? (
                        <img
                          className="profile"
                          src={`https://image.tmdb.org/t/p/original${e.profile_path}`}
                          alt="profile"
                        />
                      ) : (
                        <img
                          src={profile}
                          className="none-profile"
                          alt="none-user"
                        />
                      )}
                      <p
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          margin: "5% 0 0 0",
                        }}
                      >
                        {e.character}
                      </p>
                      <p
                        style={{
                          color: "#fff",
                          textAlign: "center",
                          margin: "5% 0",
                        }}
                      >
                        ({e.name})
                      </p>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : null}

          {backdrops.length !== 0 ? (
            <div className="cast-wrapper">
              <div className="line-wrapper title-margin">
                <div className="line-text">
                  Backdrops
                </div>
                <div>
                  <div className="line-top"></div>
                  <div className="line-bottom"></div>
                </div>
              </div>
              <Swiper
                slidesPerView={2.3}
                spaceBetween={50}
                navigation
                loop={true}
                observer={true}
                observeParents={true}
              >
                {backdrops.map((e, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${e.file_path}`}
                      alt="backdrop"
                      style={{
                        width: "100%",
                        height: "auto",
                        cursor:'pointer'
                      }}
                      onClick={() => {
                        this.setState({
                          modalImage: true,
                          count: i,
                        });
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : null}

          <div className="cast-wrapper">
            <div className="line-wrapper title-margin">
              <div className="line-text">
                Similars
              </div>
              <div>
                <div className="line-top"></div>
                <div className="line-bottom"></div>
              </div>
            </div>
            <Swiper
              spaceBetween={50}
              slidesPerView={4}
              navigation
              observer={true}
              observeParents={true}
              loop={true}
              className="swiper"
            >
              {similarList.map((e, i) => (
                <SwiperSlide className="swiper-slide" key={i}>
                  <Link
                    to={
                      "/detail/" +
                      this.type() +
                      "/" +
                      e.id +
                      "/" +
                      `${(e.name || e.title).replace(
                        /[#!$%^&*;:{}=`()]/g,
                        "-"
                      )}`
                    }
                    style={{ textAlign: "center", textDecoration: "none" }}
                  >
                    <img
                      className="poster"
                      src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                      alt={this.props.detail.name || this.props.detail.title}
                    ></img>
                    <span className="content-name2">{e.name || e.title}</span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {this.modalImage()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    detail: state.detailReducer,
    season: state.seasonReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      getDetail: bindActionCreators(detailAction.detail, dispatch),
      getSeasonDetail: bindActionCreators(detailAction.seasons, dispatch),
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));
