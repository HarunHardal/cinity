import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export function recommendationMovieReducer(
  state = initialState.recommendationMovie,
  action
) {
  switch (action.type) {
    case actionTypes.RECOMMENDATION_MOVİE:
      return action.payload;

    default:
      return state;
  }
}

export function recommendationTvReducer(
  state = initialState.recommendationTv,
  action
) {
  switch (action.type) {
    case actionTypes.RECOMMENDATION_TV:
      return action.payload;

    default:
      return state;
  }
}
