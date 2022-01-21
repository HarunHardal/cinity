import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export function watchListReducer(state = initialState.wlist, action) {
  switch (action.type) {
    case actionTypes.WATCHLIST:
      return [...state, { ...action.payload }];


    default:
      return state;
  }
}
