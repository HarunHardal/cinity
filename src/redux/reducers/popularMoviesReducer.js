import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export function popularMoviesReducer(
    state = initialState.popularMovies,
    action
){
    switch (action.type) {
        case actionTypes.POPULAR_MOVIES_OF_THE_DAY:
            return action.payload
        default:
            return state;
    }
}
