import { LOAD_ALL_ROLES_SUCCESS, LOAD_USERS_FOR_ROLE } from "../actions/actionTypes"
import initialState from "./initialState"

export default function roleReducer(state = initialState.roles, action) {
    switch(action.type) {
        case LOAD_ALL_ROLES_SUCCESS:
            return {...state, all: action.allRoles}
        case LOAD_USERS_FOR_ROLE:
            return {...state, toMap: getNewRolesMap(state, action)}
        default:
            return state
    }
}

function getNewRolesMap(state, action) {
    const newUsers = [{name: action.role.get('name'), users: action.users}]
    const oldMap = state.toMap
    console.log(oldMap)
    return newUsers.reduce(function(map, role) {
        map[role.name] = role.users;
        return map;
    }, oldMap)
}