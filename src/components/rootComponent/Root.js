import React, { Component } from "react";
import Carousel from "../carouselComponent/Carousel";
import Popular from "../popularContainer/Popular";
import RecommendationMovie from "../recommendationMovieComponent/RecommendationMovie";
import RecommendationTv from "../recommendationMovieComponent/RecommendationTv";
import Upcoming from "../upcomingComponent/Upcoming";

export default class Root extends Component {

  render() {
    return (
      <div >
            <Carousel />
            <Popular />
            <Upcoming />
            <RecommendationMovie />
            <RecommendationTv />
      </div>
    );
  }
}
