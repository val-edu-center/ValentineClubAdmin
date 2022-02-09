import * as roleApi from "../../api/roleApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"
import { CHANGE_GROUP_ROLE_SUCCESS, LOAD_ALL_ROLES_SUCCESS, LOAD_USERS_FOR_ROLE } from "./actionTypes"

export function loadAllRolesSuccess(allRoles) {
    return { type: LOAD_ALL_ROLES_SUCCESS, allRoles }
}

export function loadUsersForRoleSuccess(role, users) {
    return { type: LOAD_USERS_FOR_ROLE, role, users }
}

export function changeGroupRoleSucces(user, newRole, oldRole) {
    return { type: CHANGE_GROUP_ROLE_SUCCESS, oldRole, newRole, user }
}

export function loadAllRoles() {
    return function (dispatch) {
        dispatch(beginApiCall)
        return roleApi
            .getAllParseRoles()
            .then(roles => {
                dispatch(loadAllRolesSuccess(roles))
                return roles
            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}
export function loadUsersForRole(role) {
    return function (dispatch) {
        dispatch(beginApiCall)
        return roleApi
            .getUsersForRole(role)
            .then(users => {
                dispatch(loadUsersForRoleSuccess(role, users));
            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}
//TODO organize this
export function changeGroupRole(user, newRole, oldRole) {
    return function (dispatch) {
        return roleApi
            .changeGroupRole(newRole, user)
            .then(() => {
                roleApi
                    .addUser(newRole, user)
                    .then(() => {
                        if (oldRole !== null) {
                            roleApi.removeUser(oldRole, user)
                                .then(() => {
                                    dispatch(changeGroupRoleSucces(user, newRole, oldRole))
                                })
                                .catch(error => {
                                    dispatch(apiCallError())
                                    throw error
                                })
                        }
                    })
                    .catch(error => {
                        dispatch(apiCallError())
                        throw error
                    })

            })
            .catch(error => {
                dispatch(apiCallError())
                throw error
            })
    }
}