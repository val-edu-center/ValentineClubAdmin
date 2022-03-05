import { LOAD_ALL_ROLES_SUCCESS, LOAD_USERS_FOR_ROLE, CHANGE_GROUP_ROLE_SUCCESS, CLEAR_ROLES } from "../actions/actionTypes"
import initialState from "./initialState"

export default function roleReducer(state = initialState.roles, action) {
    switch (action.type) {
        case LOAD_ALL_ROLES_SUCCESS:
            return { ...state, all: action.allRoles }
        case LOAD_USERS_FOR_ROLE:
            return { ...state, userToRoles: addUsers(state, action.role.get('name'), action.users) }
        case CHANGE_GROUP_ROLE_SUCCESS:
            return {...state, userToRoles: changeGroupRole(state, action.user, action.newRole.get('name'), action.oldRole.get('name'))}
        case CLEAR_ROLES:
            return initialState.roles
        default:
            return state
    }
}

function changeGroupRole(state, targetUser, newGroupRole, oldGroupRole) {
    const newMap = new Map()
    state.userToRoles.forEach((roles, userId) => {
        if(userId === targetUser.id) {
            const newRoles = roles.filter(role => role !== oldGroupRole)
            newRoles.push(newGroupRole)
            newMap.set(userId, newRoles)
        } else {
            newMap.set(userId, roles)
        }
    })
    return newMap

}

function addUsers(state, roleName, users) {
    const newUsers = users.map(user => [user.id, roleName])
    const existingUsers = Array.from(state.userToRoles.entries())
    return buildNewMap(newUsers.concat(existingUsers))

}

function buildNewMap(entries) {
    const newMap = new Map()
    entries.map(entry => {
        const userId = entry[0]
        const roles = entry[1]
        const existingRoles = newMap.get(userId)

        if (Array.isArray(roles)) {
            if (existingRoles) {
                newMap.set(userId, [...existingRoles, ...roles])
            } else {
                newMap.set(userId, roles)
            }
        } else {
            if (existingRoles) {
                newMap.set(userId, [...existingRoles, roles])
            } else {
                newMap.set(userId, [roles])
            }
        }

        return newMap;
    })

    return newMap

}