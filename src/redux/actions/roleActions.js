import * as roleApi from "../../api/roleApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"
import { LOAD_ALL_ROLES_SUCCESS } from "./actionTypes"

export function loadAllRolesSuccess(allRoles) {
    return {type: LOAD_ALL_ROLES_SUCCESS, allRoles}
}

export function loadAllRoles() {
    return function (dispatch) {
        dispatch(beginApiCall)
        return roleApi
        .getAllParseRoles()
        .then(response => {
            dispatch(loadAllRolesSuccess(response));
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
            dispatch(loadAllRolesSuccess(response));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }

}