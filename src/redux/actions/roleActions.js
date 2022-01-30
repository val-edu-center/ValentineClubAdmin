import * as roleApi from "../../api/roleApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"
import { ADD_USER_SUCCESS, LOAD_ALL_ROLES_SUCCESS, LOAD_USERS_FOR_ROLE, REMOVE_USER_SUCESSS } from "./actionTypes"

export function loadAllRolesSuccess(allRoles) {
    return {type: LOAD_ALL_ROLES_SUCCESS, allRoles}
}

export function loadUsersForRoleSuccess(role, users) {
    return {type: LOAD_USERS_FOR_ROLE, role, users}
}

export function addUserSuccess(role, user) {
    return {type: ADD_USER_SUCCESS, role, user}
}
export function removeUserSuccess(role, user) {
    return {type: REMOVE_USER_SUCESSS, role, user}
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
        .catch (error => {
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
        .then(response => {
            dispatch(loadUsersForRoleSuccess(role, response));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function addUser(role, user) {
    return function (dispatch) {
        return roleApi
        .addUser(role, user)
        .then(() => {
            dispatch(addUserSuccess(role, user))
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function removeUser(role, user) {
    return function (dispatch) {
        return roleApi
        .removeUser(role, user)
        .then(() => {
            dispatch(removeUserSuccess(role, user))
        })
        .catch (error => {
            console.log(error)
            dispatch(apiCallError())
            throw error
        })
    }
}