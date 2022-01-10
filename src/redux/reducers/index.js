import {combineReducers} from 'redux'
import session from './sessionReducer'
import users from './userReducer'
import apiCallsInProgress from './apiStatusReducer'

const rootReducer = combineReducers({
    session, users, apiCallsInProgress
})

export default rootReducer;