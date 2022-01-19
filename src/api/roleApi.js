import { handleResponse, handleError, loadFromLocalStorage } from "./apiUtils"

const baseUrl = process.env.BACK4APP_API_URL + "/roles/"
const appId = process.env.BACK4APP_APP_ID
const restApiKey = process.env.BACK4APP_REST_API_KEY

export function getAllRoles() {
    const state = loadFromLocalStorage()
    const sessionToken = state.session.sessionToken
    return fetch(baseUrl, {
        headers: {
            "content-type": "application/json",
            "X-Parse-Application-Id": appId,
            "X-Parse-REST-API-Key": restApiKey,
            "X-Parse-Session-Token": sessionToken
        }
    })
        .then(handleResponse)
        .catch(handleError)
}