import { combineReducers } from "redux";
import carauselReducer from "./carouselReducer";
import { popularMoviesReducer } from "./popularMoviesReducer";
import { popularTvShowsReducer } from "./popularTvShowsOfTheDayReducer";
import {
  recommendationMovieReducer,
  recommendationTvReducer,
} from "./recommendationReducer";
import {
  upcomingTrailersReducer,
  upcomingTrailersDefaultUrlReducer,
  getVideoReducer,
} from "./upcomingTrailersReducer";
import { detailReducer } from "./detailReducer";
import { seasonReducer } from "./seasonReducer";
import { personReducer } from "./personReducer";
import { allMoviesReducer } from "./allMoviesReducer";
import { allDataReducer } from "./allDataReducer";
import { loadMoreReducer } from "./loadMoreReducer";
import { searchReducer } from "./searchReducer";
import { watchListReducer } from './watchListReducer'

const rootReducer = combineReducers({
  carauselReducer,
  popularMoviesReducer,
  popularTvShowsReducer,
  recommendationMovieReducer,
  recommendationTvReducer,
  upcomingTrailersReducer,
  upcomingTrailersDefaultUrlReducer,
  getVideoReducer,
  detailReducer,
  seasonReducer,
  personReducer,
  allMoviesReducer,
  allDataReducer,
  loadMoreReducer,
  searchReducer,
  watchListReducer,
});
export default rootReducer;
