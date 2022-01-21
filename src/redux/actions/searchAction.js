import * as actionTypes from "./actionTypes";
import axios from "axios";
import key from "./key";

export function getSearch(data) {
  return {
    type: actionTypes.SEARCH,
    payload: data,
  };
}

export function search(e){
    return(dispatch)=>{
        axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=${key}&query=${e}`
        )
        .then((data)=>{
            dispatch(getSearch(data.data.results))
        })
        .catch(err=>console.log(err))
    }
}