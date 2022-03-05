import { CREATE_USER_SUCCESS, UPDATE_USER_SUCCESS, LOAD_USERS_SUCCESS, DELETE_USER_OPTIMISTIC, CLEAR_USERS } from "../actions/actionTypes"
import initialState from './initialState'

export default function userReducer(state = initialState.users, action) {
    switch(action.type) {
        case CREATE_USER_SUCCESS:
            return [...state, action.user]
        case UPDATE_USER_SUCCESS:
            return state.map (
                user => user.id === action.user.id ? action.user : user 
            )
        case LOAD_USERS_SUCCESS:
            return action.users
        case DELETE_USER_OPTIMISTIC:
            return state.filter (user => user.id !== action.user.id)
        case CLEAR_USERS:
            return initialState.users
        default:
            return state
    }

}