import axios from "axios";
import * as actionTypes from "./actionTypes";

const key = process.env.REACT_APP_MOVIE_API_KEY;

export function getRecomendationMovie(info) {
  return {
    type: actionTypes.RECOMMENDATION_MOVİE,
    payload: info,
  };
}
export function getRecomendationTv(info) {
  return {
    type: actionTypes.RECOMMENDATION_TV,
    payload: info,
  };
}

export function getRecomendationMovies(movieId, pageId) {
  return function (dispatch) {
    axios
      .get(
        ` https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${pageId}`
      )
      .then((data) => {
        var id = data.data.results[movieId].id;
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&append_to_response=credits`
          )
          .then((data) => {
            dispatch(getRecomendationMovie(data.data));
          });
      })
      .catch((err) => console.log(err));
  };
}

export function recomendationTV(tvId, pageId) {
  return function (dispatch) {
    axios
      .get(
        ` https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=${pageId}`
      )
      .then((data) => {
        var id = data.data.results[tvId].id;
        axios
          .get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US&append_to_response=credits`
          )
          .then((data) => {
            dispatch(getRecomendationTv(data.data));
          });
      })
      .catch((err) => console.log(err));
  };
}
