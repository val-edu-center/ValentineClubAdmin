import { handleResponse, handleError, loadFromLocalStorage, getHeaders } from "./apiUtils";

const baseUrl = process.env.BACK4APP_API_URL + "/classes/Accounts";

//TODO Convert to use parse library
export function getAllAccounts() {
    return fetch(baseUrl, {headers: getHeaders()})
        .then(handleResponse)
        .catch(handleError);
}

export function createBankAccount(username) {
    return fetch(baseUrl, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({username, balance: 0})
    })
        .then(handleResponse)
        .catch(handleError);

}