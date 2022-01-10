import { CREATE_USER_SUCCESS, UPDATE_USER_SUCCESS, LOAD_USERS_SUCCESS, DELETE_USER_OPTIMISTIC } from "./actionTypes";
import * as userApi from "../../api/userApi"
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function createUserSuccess(user) {
    return { type: CREATE_USER_SUCCESS, user}
}

export function updateUserSuccess(user) {
    return { type: UPDATE_USER_SUCCESS, user}
}

export function loadUsersSuccess(users) {
    return { type: LOAD_USERS_SUCCESS, users}
}

export function deleteUserOptimistic(user) {
    return { type: DELETE_USER_OPTIMISTIC, user}
}

export function loadUsers() {
    return function (dispatch) {
        dispatch(beginApiCall)
        return userApi
        .getUsers()
        .then(response => {
            dispatch(loadUsersSuccess(response.results));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function saveUser(user) {
    return function (dispatch) {
        dispatch(beginApiCall())
        return userApi
        .saveUser(user)
        .then(savedAccount => {
            if (user.id) {
                dispatch(updateUserSuccess(savedAccount))
            } else {
                dispatch(createUserSuccess(savedAccount))
            }
        }).catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function deleteUser(user) {
    return function (dispatch) {
        dispatch(deleteUserOptimistic(user))
        return userApi.deleteUser(user.objectId)
    }
}