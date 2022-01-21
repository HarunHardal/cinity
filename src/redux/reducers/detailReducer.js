import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export function detailReducer(
    state = initialState.detail,
    action
){
    switch (action.type) {
        case actionTypes.DETAIL:
        return action.payload
    
        default:
            return state
    }
}