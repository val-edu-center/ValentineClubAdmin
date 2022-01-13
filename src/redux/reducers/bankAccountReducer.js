import initialState from "./initialState"
import { LOAD_BANK_ACCOUNTS_SUCCESS } from "../actions/actionTypes"

export default function bankAccountReducer(state = initialState.bankAccounts, action) {
    switch(action.type) {
        case LOAD_BANK_ACCOUNTS_SUCCESS:
            return action.bankAccounts
        default:
            return state
    }
}