import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export function allMoviesReducer(state = initialState.allMovies, action) {
  switch (action.type) {
    case actionTypes.All_MOVIES:
      return action.payload;

    default:
      return state;
  }
}
