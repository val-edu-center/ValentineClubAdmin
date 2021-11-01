import { LOAD_SESSION_SUCCESS } from "../actions/actionTypes"
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

function mapSession(session) {
    const isBanker = session.ACL && session.ACL.Nol30IVkdt
    const isLoggedIn = !session.sessionToken
    return {sessionToken: session.sessionToken, isLoggedIn, isBanker}
}

export default function sessionReducer(state = initialState.session, action) {
    switch(action.type) {
        case LOAD_SESSION_SUCCESS:
            return mapSession(action.session)
        default:
            return state
    }
}