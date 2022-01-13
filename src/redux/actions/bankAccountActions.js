import * as bankAccountApi from "../../api/bankAccountApi"
import { apiCallError, beginApiCall } from "./apiStatusActions"
import { LOAD_BANK_ACCOUNTS_SUCCESS } from "./actionTypes"

export function loadBankAccountsSuccess (bankAccounts) {
    return {type: LOAD_BANK_ACCOUNTS_SUCCESS, bankAccounts}
}

export function loadBankAccounts() {
    return function (dispatch) {
        dispatch(beginApiCall)
        return bankAccountApi
        .getAllAccounts()
        .then(response => {
            dispatch(loadBankAccountsSuccess(response.results));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }

}
