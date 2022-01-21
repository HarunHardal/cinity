import * as actionTypes from './actionTypes'
const key = process.env.REACT_APP_MOVIE_API_KEY;
export function getPopularTvShows(info){
    return{
        type: actionTypes.POPULAR_TV_SHOWS_OF_THE_DAY,
        payload: info
    }
}

export function getPopularTvShowsOfTheDay(){
    return function (dispatch) {
        return fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${key}`)
          .then((res) => res.json())
          .then((data) => {
            dispatch(getPopularTvShows(data.results));
          })
          .catch((err) => console.log(err));
      };
}