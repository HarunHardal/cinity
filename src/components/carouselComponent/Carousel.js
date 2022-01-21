import React, { Component } from "react";
import { bindActionCreators, combineReducers } from "redux";
import { connect } from "react-redux";
import "./carousel.css";
import * as carouselAction from "../../redux/actions/carouselAction";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/components/navigation/navigation.min.css";
import "../../../node_modules/swiper/components/pagination/pagination.min.css";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Autoplay]);
class Carousel extends Component {
  componentDidMount() {
    this.props.action.getCarousel();
    console.clear()
  }
  componentDidUpdate() {
    this.images();
  }
  constructor() {
    super();
    this.state = {
      ani: false,
    };
  }
  images() {
    const images = this.props.carouselInfo;
    return images;
  }
  carousel = () => {
    return (
      <Swiper
        pagination={{ clickable: true }}
        navigation
        observer={true}
        observeParents={true}
        loop={true}
        //autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="posters"
      >
        {this.props.carouselInfo.map((e, i) => (
          <SwiperSlide key={i}>
            <img
              className="backdrop"
              src={`https://image.tmdb.org/t/p/original/${e.backdrop_path}`}
              alt={e.title}
            />
            <div className="shadow"></div>
            <Link
                to={`/detail/${"movie"}/${e.id}/${e.title}`}
                style={{ textDecoration: "none" }}
              >
            <div className="content-wrapper">
              <span className="slash-carousel">/</span>
       
                <p className="content-name"> {e.title}</p>
             
            </div>
            </Link>

          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  render() {
    return <div>{this.carousel()}</div>;
  }
}
function mapStateToProps(state) {
  return {
    carouselInfo: state.carauselReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    action: {
      getCarousel: bindActionCreators(carouselAction.getCarouselInfo, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
