import { LOAD_SESSION_SUCCESS, REMOVE_SESSION } from "../actions/actionTypes"
import initialState from './initialState'
import * as roleMapper from "../../utility/RoleMapper"
import Session from "../../model/Session"

function mapSession(session) {
    const roles = roleMapper.getRoles(session.objectId, session.ACL)
    const newSession = new Session
    newSession.sessionToken = session.sessionToken
    newSession.roles = roles
    return newSession
}

export default function sessionReducer(state = initialState.session, action) {
    switch(action.type) {
        case LOAD_SESSION_SUCCESS:
            return mapSession(action.session)
        case REMOVE_SESSION:
            return initialState.session
        default:
            return state
    }
}