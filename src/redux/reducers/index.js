import {combineReducers} from 'redux'
import courses from './courseReducer'
import authors from './authorReducer'
import session from './sessionReducer'
import accounts from './accountReducer'
import apiCallsInProgress from './apiStatusReducer'

const rootReducer = combineReducers({
    session, courses, authors, accounts, apiCallsInProgress
})

export default rootReducer;