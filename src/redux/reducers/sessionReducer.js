import { LOAD_SESSION_SUCCESS } from "../actions/actionTypes"
import initialState from './initialState'

export default function sessionReducer(state = initialState.session, action) {
    switch(action.type) {
        case LOAD_SESSION_SUCCESS:
            return action.session
        default:
            return state
    }
}