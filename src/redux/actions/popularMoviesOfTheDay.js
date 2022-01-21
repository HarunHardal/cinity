import * as actionTypes from "./actionTypes";
const key = process.env.REACT_APP_MOVIE_API_KEY;
function getPopularMovies(info) {
  return { type: actionTypes.POPULAR_MOVIES_OF_THE_DAY, payload: info };
}

export function getPopularMoviesOfTheDay() {
  return function (dispatch) {
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(getPopularMovies(data.results));
      })
      .catch((err) => console.log(err));
  };
}
