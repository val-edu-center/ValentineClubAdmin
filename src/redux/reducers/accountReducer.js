import { CREATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_SUCCESS, LOAD_ACCOUNTS_SUCCESS, DELETE_ACCOUNT_OPTIMISTIC } from "../actions/actionTypes"
import initialState from './initialState'

export default function accountReducer(state = initialState.accounts, action) {
    switch(action.type) {
        case CREATE_ACCOUNT_SUCCESS:
            return [...state, {...action.account}]
        case UPDATE_ACCOUNT_SUCCESS:
            return state.map (
                account => account.id === action.account.id ? action.account : account 
            )
        case LOAD_ACCOUNTS_SUCCESS:
            return action.accounts
        case DELETE_ACCOUNT_OPTIMISTIC:
            return state.filter (account => account.objectId !== action.account.objectId)
        default:
            return state
    }
}