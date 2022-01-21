import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export function upcomingTrailersReducer(
  state = initialState.upcomingTrailers,
  action
) {
  switch (action.type) {
    case actionTypes.UPCOMİNG_TRAİLERS:
      return action.payload;

    default:
      return state;
  }
}

export function upcomingTrailersDefaultUrlReducer(
  state = initialState.upcomingTrailersDefaultUrl,
  action
){
  switch (action.type) {
    case actionTypes.UPCOMİNG_TRAİLERS_DEFAULT_URL:
      return action.payload

    default:
      return state
  }
}

export function getVideoReducer(
  state = initialState.videoUrl,
  action
){
  switch (action.type) {
    case actionTypes.VIDEO_URL:
      return action.payload
  
    default:
      return state;
  }
}