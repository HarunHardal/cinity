import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export function personReducer(state = initialState.person, action) {
  switch (action.type) {
    case actionTypes.PERSON:
      return action.payload;

    default:
      return state;
  }
}
