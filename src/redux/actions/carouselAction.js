import axios from 'axios';
import * as actionTypes from './actionTypes'
import key from './key'

//const key = process.env.REACT_APP_MOVIE_API_KEY
export function getCarousel(image){
    return{type: actionTypes.CAROUSEL_INFO, payload: image}
}

export function getCarouselInfo(){
    return (dispatch)=>{
          return axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`)
          .then(data=>{dispatch(getCarousel(data.data.results));})
          .catch(err=> console.log(err))
    }
}
