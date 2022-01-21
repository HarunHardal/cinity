import key from "./key";
import axios from "axios";
import * as actionTypes from "./actionTypes";

export function getAllData(data) {
  return {
    type: actionTypes.ALL_DATA,
    payload: data,
  };
}
export function loadMore(list) {
  return {
    type: actionTypes.LOAD_MORE,
    payload: list,
  };
}
export function changeLoadMore(change) {
  return {
    type: actionTypes.CHANGE_LOAD_MORE,
    payload: change,
  };
}
export function allData(type, categoryId, page,control) {
  if (control === false) {
    return (dispatch) => {
      return axios
        .get(
          `https://api.themoviedb.org/3/discover/${type}?api_key=${key}&with_genres=${categoryId}&page=${page}
          `
        )
        .then((data) => {
          dispatch(getAllData(data.data.results));
        })
        .catch((err) => console.log(err));
    };
   }  
  else {
    return (dispatch) => {
      return axios
        .get(
          `https://api.themoviedb.org/3/${type}/${categoryId}?api_key=${key}&page=${page}`
        )
        .then((data) => dispatch(getAllData(data.data.results)))
        .catch((err) => console.log(err));
    };
  }
}
