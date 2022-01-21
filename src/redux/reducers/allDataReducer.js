import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export function allDataReducer(
  state = initialState.allData,
  action
) {
  switch (action.type) {
    case actionTypes.ALL_DATA:
      return action.payload;

    default:
      return state;
  }
}
