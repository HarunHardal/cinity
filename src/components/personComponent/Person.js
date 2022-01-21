import React, { Component } from "react";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import "./person.css";
import * as personAction from "../../redux/actions/personAction";
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/components/navigation/navigation.min.css";
import "../../../node_modules/swiper/components/pagination/pagination.min.css";
import SwiperCore, { Navigation } from "swiper";
import { Link } from "react-router-dom";
SwiperCore.use([Navigation]);
class Person extends Component {
  componentDidMount() {
    const person = this.props.match.params;
    const personId = person.id;
    this.props.action.getPerson(personId);
    window.scrollTo(0, 0);
    console.clear();
  }
  date = (e, l) => {
    const fullDate = e || "";
    const year = fullDate.substr(0, 4);
    const a = fullDate.indexOf("-");
    const b = fullDate.lastIndexOf("-");
    const mounth = fullDate.substr(a + 1, 2);
    const day = fullDate.substr(b + 1, 2);
    const date = new Date();
    const getYear = date.getFullYear();
    const age = getYear - Number(year);

    let mounthName;
    switch (mounth) {
      case "01":
        mounthName = "January";
        break;
      case "02":
        mounthName = "February";
        break;
      case "03":
        mounthName = "March";
        break;
      case "04":
        mounthName = "April";
        break;
      case "05":
        mounthName = "May";
        break;
      case "06":
        mounthName = "June";
        break;
      case "07":
        mounthName = "July";
        break;
      case "08":
        mounthName = "August";
        break;
      case "09":
        mounthName = "September";
        break;
      case "10":
        mounthName = "October";
        break;
      case "11":
        mounthName = "November";
        break;
      case "12":
        mounthName = "December";
        break;
      default:
        break;
    }
    // if(this.props.personInfo.birthday){
    //   return (<p className="person-text" style={{marginLeft:'20px'}}> {`${mounthName} ${day}, ${year} (age ${age}) ${this.props.personInfo.place_of_birth}  `}</p>)
    // }

    /*
    <div>
<p className="person-text" style={{marginLeft:'20px'}}> {`${mounthName} ${day}, ${year} (age ${age}) ${this.props.personInfo.place_of_birth}  `}</p>
  <p className="person-text" style={{marginLeft:'20px'}}> {`${mounthName} ${day}, ${year}   `}</p>
    </div>

*/
    if (!e) {
      return null;
    } else if (l === "b") {
      return (
        <p className="person-text" style={{ marginLeft: "20px" }}>
          {" "}
          {`${mounthName} ${day}, ${year} (age ${age}) ${this.props.personInfo.place_of_birth}  `}
        </p>
      );
    } else if (l === "d") {
      return (
        <div>
          <p className="person-text" style={{ marginLeft: "20px" }}>
            {" "}
            {`${mounthName} ${day}, ${year}   `}
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const personImages = this.props.personInfo.images || {};
    const personProfile = personImages.profiles || [];
    const personImage = personProfile[0] || "";
    const filepath = personImage.file_path || "";
    const movieCredits = this.props.personInfo.movie_credits || [];
    const movieCast = movieCredits.cast || [];
    const tvCredits = this.props.personInfo.tv_credits || [];
    const tvCast = tvCredits.cast || [];

    return (
      <div style={{ marginTop: "5%" }}>
        <div className="person-biography-container">
          <div className="person-biography">
            <div className="line-wrapper">
              <div className="line-text">
                <span className="slash-title">/</span>
                {this.props.personInfo.name}
              </div>
              <div>
                <div className="line-top"></div>
                <div className="line-bottom"></div>
              </div>
            </div>
            <h2 className="person-title" alt="biographt">
              bıography
            </h2>
            <p className="person-text">{this.props.personInfo.biography}</p>
            <div className="personal-info-container">
              <div className="person-date">
                <h3 className="personal-info-title">Born :</h3>
                {this.date(this.props.personInfo.birthday, "b")}
              </div>
              {this.props.personInfo.deathday ? (
                <div className="person-date">
                  <h3 className="personal-info-title">Died :</h3>
                  {this.date(this.props.personInfo.deathday, "d")}
                </div>
              ) : null}
            </div>
          </div>
          <div className="person-profile">
            <img
              className="person-profile-image"
              src={`https://image.tmdb.org/t/p/original${filepath}`}
              alt={this.props.personInfo.name + "photo"}
            />
            <div className="person-profile-radial"></div>
            <div className="person-profile-shadow"></div>
          </div>
        </div>
        <div className="person-productions">
          <div className="line-wrapper title-margin">
            <div className="line-text">Movies</div>
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
            {movieCast.map((e, i) => (
              <SwiperSlide className="swiper-slide" key={i}>
                <Link
                  to={"/detail/movie/" + e.id + "/" + `${e.title}`}
                  style={{ textAlign: "center", textDecoration: "none" }}
                >
                  <img
                    className="poster"
                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                    alt={e.title}
                  ></img>
                  <span className="content-name2">{e.name || e.title}</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="line-wrapper title-margin">
            <div className="line-text">Tv Shows</div>
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
            {tvCast.map((e, i) => (
              <SwiperSlide className="swiper-slide" key={i}>
                <Link
                  to={"/detail/movie/" + e.id + "/" + `${e.name}`}
                  style={{ textAlign: "center", textDecoration: "none" }}
                >
                  <img
                    className="poster"
                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                    alt={e.name}
                  ></img>
                  <span className="content-name2">{e.name}</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    personInfo: state.personReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      getPerson: bindActionCreators(personAction.person, dispatch),
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Person));
