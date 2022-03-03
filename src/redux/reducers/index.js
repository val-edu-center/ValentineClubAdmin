import {combineReducers} from 'redux'
import session from './sessionReducer'
import users from './userReducer'
import bankAccounts from './bankAccountReducer'
import apiCallsInProgress from './apiStatusReducer'
import roles from './roleReducer'
import gameNight from './gameNightReducer'

const rootReducer = combineReducers({
    session, users, roles, bankAccounts, gameNight, apiCallsInProgress
})

export default rootReducer;