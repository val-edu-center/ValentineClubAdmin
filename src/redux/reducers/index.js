import {combineReducers} from 'redux'
import courses from './courseReducer'
import authors from './authorReducer'
import session from './sessionReducer'
import apiCallsInProgress from './apiStatusReducer'

const rootReducer = combineReducers({
    session, courses, authors, apiCallsInProgress
})

export default rootReducer;