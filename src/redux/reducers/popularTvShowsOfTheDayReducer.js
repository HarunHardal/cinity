import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export function popularTvShowsReducer(
  state = initialState.popularTvShows,
  action
) {
  switch (action.type) {
    case actionTypes.POPULAR_TV_SHOWS_OF_THE_DAY:
      return action.payload;

    default:
      return state;
  }
}
