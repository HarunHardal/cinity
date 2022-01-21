import axios from 'axios'
import * as actionTypes from './actionTypes'
import key from './key'

//const key = process.env.REACT_APP_MOVIE_API_KEY

export function upcomingTrailers(info){
    return{
        type: actionTypes.UPCOMİNG_TRAİLERS,
        payload: info
    }
}

export function upcomingTrailersDefaultUrl(info){
    return{
        type: actionTypes.UPCOMİNG_TRAİLERS_DEFAULT_URL,
        payload: info
    }
}
export function getVideoAction(info){
    return{
        type: actionTypes.VIDEO_URL,
        payload: info
    }
}

export function getUpcomingTrailers(){
    return function(dispatch){
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&append_to_response=videos,credits,images`)
        .then((data)=>{
            dispatch(upcomingTrailers(data.data.results))
        })
        .catch(err=>console.log(err))
    }
}

export function getUpcomingTrailersDefaultUrl(){
    return function(dispatch){
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`)
        .then((data)=>{
            dispatch(upcomingTrailersDefaultUrl(data.data.results[0].backdrop_path))
        })
        .catch(err=>console.log(err))
    }
}

export function getVideo(type,id){
    return function(dispatch){
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${key}&language=en-US`)
        .then((data)=>{
            dispatch(getVideoAction(data.data.results[0].key))
        })
        .catch(err=>console.log(err))
    }
}