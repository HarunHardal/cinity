import axios from "axios";
import * as actionTypes from "./actionTypes";
import key from "./key";

export function getDetail(info) {
  return {
    type: actionTypes.DETAIL,
    payload: info,
  };
}

export function getSeasonDetail(info) {
  return {
    type: actionTypes.SEASONS,
    payload: info,
  };
}

export function detail(type, id, seasons) {
  if (seasons) {
    return function (dispatch) {
      axios
        .get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&append_to_response=videos,credits,images,similar,media,seasons`
        )
        .then((data) => {
          dispatch(getDetail(data.data));
        })
        .catch((err) => console.log(err));
    };
  } else {
    return function (dispatch) {
      axios
        .get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&append_to_response=videos,credits,images,similar,media`
        )
        .then((data) => {
          dispatch(getDetail(data.data));
        })
        .catch((err) => console.log(err));
    };
  }
}

export function seasons(id, seasonNumber) {
  return (dispatch) => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${key}&append_to_response=`
      )
      .then((data) => {
        dispatch(getSeasonDetail(data.data));
      })
      .catch((err) => console.log(err));
  };
}
