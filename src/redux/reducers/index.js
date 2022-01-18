import {combineReducers} from 'redux'
import session from './sessionReducer'
import users from './userReducer'
import bankAccounts from './bankAccountReducer'
import apiCallsInProgress from './apiStatusReducer'
import allRoles from './roleReducer'

const rootReducer = combineReducers({
    session, users, allRoles, bankAccounts, apiCallsInProgress
})

export default rootReducer;