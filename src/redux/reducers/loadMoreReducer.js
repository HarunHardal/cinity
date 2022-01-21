import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export function loadMoreReducer(state = initialState.loadMoreData, action) {
  switch (action.type) {
    case actionTypes.LOAD_MORE:
      return [...state, { ...action.payload }];

    case actionTypes.CHANGE_LOAD_MORE:
      return [];

    default:
      return state;
  }
}
