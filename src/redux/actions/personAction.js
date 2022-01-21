import axios from "axios";
import * as actionTypes from "./actionTypes";
import key from "./key";

export function getPerson(data) {
  return {
    type: actionTypes.PERSON,
    payload: data,
  };
}

export function person(id) {
  return (dispatch) => {
    return axios
      .get(`https://api.themoviedb.org/3/person/${id}?api_key=${key}&language=en-US&append_to_response=images,movie_credits,tv_credits`
      )
      .then((data) => {
        dispatch(getPerson(data.data));
    })
      .catch((err) => console.log(err));
  };
}
