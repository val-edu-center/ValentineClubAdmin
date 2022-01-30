import { ADD_USER_SUCCESS, LOAD_ALL_ROLES_SUCCESS, LOAD_USERS_FOR_ROLE, REMOVE_USER_SUCESSS } from "../actions/actionTypes"
import initialState from "./initialState"

export default function roleReducer(state = initialState.roles, action) {
    switch (action.type) {
        case LOAD_ALL_ROLES_SUCCESS:
            return { ...state, all: action.allRoles }
        case LOAD_USERS_FOR_ROLE:
            return { ...state, toMap: getUsersToRolesMap(state, action.role.get('name'), action.users) }
        case ADD_USER_SUCCESS:
            return { ...state, toMap: getUsersToRolesMap(state, action.role.get('name'), [action.user]) }
        case REMOVE_USER_SUCESSS:
            return { ...state, toMap: removeUserFromMap(state, action.role.get('name'), action.user) }
        default:
            return state
    }
}

function removeUserFromMap(state, roleName, user) {
    const newEntries = state.toMap.entries().filter(entry => entry[0] !== user.objectId || entry[1] !== roleName)
    return buildNewMap(newEntries)
}

function getUsersToRolesMap(state, roleName, users) {
    const newUsers = users.map(user => [user.id, roleName])
    const oldMap = state.toMap
    const newEntries = [...oldMap.entries(), ...newUsers]
    return buildNewMap(newEntries)
}

function buildNewMap(newEntries) {
    return newEntries.reduce(function (map, obj) {
        const user = obj[0]
        const newRole = obj[1]
        const oldRoles = map.get(user)
        if (oldRoles) {
            map.set(user, [...oldRoles, newRole])
        } else if (Array.isArray(newRole)) {
            map.set(user, newRole)
        }
        else {
            map.set(user, [newRole])
        }
        return map;
    }, new Map())

}