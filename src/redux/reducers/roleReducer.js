import { LOAD_ALL_ROLES_SUCCESS, LOAD_USERS_FOR_ROLE, CHANGE_GROUP_ROLE_SUCCESS } from "../actions/actionTypes"
import initialState from "./initialState"
import * as roleMapper from "../../utility/RoleMapper"

export default function roleReducer(state = initialState.roles, action) {
    switch (action.type) {
        case LOAD_ALL_ROLES_SUCCESS:
            return { ...state, all: action.allRoles }
        case LOAD_USERS_FOR_ROLE:
            return { ...state, userToRoles: addUsers(state, action.role.get('name'), action.users) }
        case CHANGE_GROUP_ROLE_SUCCESS:
            return {...state, userToRoles: changeGroupRole(state, action.role.get('name'), action.user)}
        
        default:
            return state
    }
}

function changeGroupRole(state, newGroupRole, targetUser) {
    const newMap = new Map()

    console.log(state.userToRoles)
    state.userToRoles.forEach((user, roles) => {
        if(user.id === targetUser.id) {
            const oldGroupRole = roleMapper.getGroupRole(targetUser.roles)
            const newRoles = roles.filter(role => role !== oldGroupRole) + newGroupRole
            console.log(newRoles)
            newMap.set(user, newRoles)
        } else {
            newMap.set(user, roles)
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
    console.log(entries)

    entries.map(entry => {
        const user = entry[0]
        const roles = entry[1]
        const existingRoles = newMap.get(user)
        if (existingRoles) {
            newMap.set(user, [...existingRoles, roles])
        } else if (Array.isArray(roles)) {
            newMap.set(user, roles)
        }
        else {
            newMap.set(user, [roles])
        }
        return newMap;
    })

    return newMap

}