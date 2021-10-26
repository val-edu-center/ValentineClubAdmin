import { CREATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_SUCCESS, LOAD_ACCOUNTS_SUCCESS, DELETE_ACCOUNT_OPTIMISTIC } from "./actionTypes";
import * as accountApi from "../../api/accountApi"
import { apiCallError, beginApiCall } from "./apiStatusActions";
//actions must have types
export function createAccountSuccess(account) {
    return { type: CREATE_ACCOUNT_SUCCESS, account}
}

export function updateAccountSuccess(account) {
    return { type: UPDATE_ACCOUNT_SUCCESS, account}
}

export function loadAccountsSuccess(accounts) {
    return { type: LOAD_ACCOUNTS_SUCCESS, accounts}
}

export function deleteAccountOptimistic(account) {
    return { type: DELETE_ACCOUNT_OPTIMISTIC, account}
}

export function loadAccounts() {
    return function (dispatch) {
        dispatch(beginApiCall)
        return accountApi
        .getAccounts()
        .then(accounts => {
            dispatch(loadAccountsSuccess(accounts));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function saveAccount(account) {
    return function (dispatch) {
        dispatch(beginApiCall())
        return accountApi
        .saveAccount(account)
        .then(savedAccount => {
            if (account.id) {
                dispatch(updateAccountSuccess(savedAccount))
            } else {
                dispatch(createAccountSuccess(savedAccount))
            }
        }).catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function deleteAccount(account) {
    return function (dispatch) {
        dispatch(deleteAccountOptimistic(account))
        return accountApi.deleteAccount(account.id)
    }
}