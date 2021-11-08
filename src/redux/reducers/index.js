import {combineReducers} from 'redux'
import session from './sessionReducer'
import accounts from './accountReducer'
import apiCallsInProgress from './apiStatusReducer'

const rootReducer = combineReducers({
    session, accounts, apiCallsInProgress
})

export default rootReducer;