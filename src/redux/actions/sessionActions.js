import { LOAD_SESSION_PARSE_SUCCESS, LOAD_SESSION_SUCCESS, REMOVE_SESSION } from "./actionTypes";
import * as sessionApi from '../../api/sessionApi'
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadSessionSuccess(session) {
    return {type: LOAD_SESSION_SUCCESS, session}
}

export function loadSessionParseSuccess(user) {
    return {type: LOAD_SESSION_PARSE_SUCCESS, user}
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

export function loadSessionParse({username, password}) {
    return function (dispatch) {
        dispatch(beginApiCall)
        return sessionApi
        .loginParse(username, password)
        .then(user => {
            dispatch(loadSessionParseSuccess(user));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function removeSession() {
    return function (dispatch) {
        return dispatch({type: REMOVE_SESSION})
    }
}