import { LOAD_ALL_ROLES_SUCCESS } from "../actions/actionTypes"
import initialState from "./initialState"

export default function roleReducer(state = initialState.allRoles, action) {
    switch(action.type) {
        case LOAD_ALL_ROLES_SUCCESS:
            return action.allRoles
        default:
            return state
    }
}