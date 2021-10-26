import {combineReducers} from 'redux'
import courses from './courseReducer'
import authors from './authorReducer'
import accounts from './accountReducer'
import apiCallsInProgress from './apiStatusReducer'

const rootReducer = combineReducers({
    courses, authors, accounts, apiCallsInProgress
})

export default rootReducer;