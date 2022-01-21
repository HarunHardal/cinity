import * as actionTypes from "./actionTypes";
import axios from "axios";
import key from "./key";

export function getAllMovies(movies) {
  return { type: actionTypes.All_MOVIES, payload: movies };
}

export function allMovies(url, page) {
    return (dispatch) => {
      return axios 
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${page}`
        )
        .then((data) => {
          dispatch(getAllMovies(data.data.results));
        })
        .catch(
          (err) => console.log(err),
        );
    };
  //}
}
