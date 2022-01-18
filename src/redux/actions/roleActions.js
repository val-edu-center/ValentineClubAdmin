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
        .getAllRoles()
        .then(response => {
            dispatch(loadAllRolesSuccess(response.results));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}