import initialState from "./initialState";
import * as actionTypes from '../actions/actionTypes'


export function seasonReducer(
    state= initialState.season,
    action
){
    switch (action.type) {
        case actionTypes.SEASONS:
            return action.payload
    
        default:
            return state
    }
}