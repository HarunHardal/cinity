import * as actionTypes from "./actionTypes";
import axios from "axios";
import key from "./key";

function getwatchlist(data) {
  return {
    type: actionTypes.WATCHLIST,
    payload: data,
  };
}

export function watchlist(type, id) {
  return (dispatch) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&append_to_response=images,media`
      )
      .then((data) => {
        dispatch(getwatchlist(data.data));
      })
      .catch((err) => console.log(err));
  };
}
