import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export function searchReducer(
    state = initialState.search,
    action
){
    switch (action.type) {
        case actionTypes.SEARCH:
            return action.payload
    
        default:
            return state
    }
}