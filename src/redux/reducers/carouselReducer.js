import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default function carauselReducer(
    state= initialState.carauselInfo,
    action
){
    switch (action.type) {
        case actionTypes.CAROUSEL_INFO:
            return action.payload;
        default:
            return state
    }
}