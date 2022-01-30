import { handleResponse, handleError, loadFromLocalStorage } from "./apiUtils"
import Parse from 'parse/dist/parse.min.js'

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

export const getAllParseRoles = async () => {
    const query = new Parse.Query(Parse.Role)
    const results = await query.find()
    return results
    
}

export const getUsersForRole = async (role) => {
    const query = role.getUsers().query()
    const results = await query.find()
    return results
}

export const removeUser = async (role, user) => {
    console.log({role,user})
    role.getUsers().remove(user)
}
export const addUser = async (role, user) => {
    console.log({role,user})
    role.getUsers().add(user)
}