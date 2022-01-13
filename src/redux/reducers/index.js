import {combineReducers} from 'redux'
import session from './sessionReducer'
import users from './userReducer'
import bankAccounts from './bankAccountReducer'
import apiCallsInProgress from './apiStatusReducer'

const rootReducer = combineReducers({
    session, users, bankAccounts, apiCallsInProgress
})

export default rootReducer;