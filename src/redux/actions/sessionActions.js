import { LOAD_SESSION_SUCCESS } from "./actionTypes";
import * as sessionApi from '../../api/sessionApi'
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadSessionSuccess(session) {
    return {type: LOAD_SESSION_SUCCESS, session}
}

export function loadSession({username, password}) {
    return function (dispatch) {
        dispatch(beginApiCall)
        return sessionApi
        .login(username, password)
        .then(session => {
            dispatch(loadSessionSuccess(session));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}