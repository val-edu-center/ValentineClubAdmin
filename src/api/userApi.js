import { handleResponse, handleError, loadFromLocalStorage } from "./apiUtils";
const baseUrl = process.env.BACK4APP_API_URL + "/users/";
const appId = process.env.BACK4APP_APP_ID;
const restApiKey = process.env.BACK4APP_REST_API_KEY;

export function getUsers() {
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
    .catch(handleError);
}
//TODO handle puts
export function saveUser(rawUser) {
  const state = loadFromLocalStorage()
  const sessionToken = state.session.sessionToken
  const user = {username: rawUser.username, objectId: rawUser.objectId, isApproved: rawUser.isApproved, roles: rawUser.roles}
  return fetch(baseUrl + (user.objectId || ""), {
    method: user.objectId ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json",
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": restApiKey,
      "X-Parse-Session-Token": sessionToken
    },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteUser(userId) {
  const state = loadFromLocalStorage()
  const sessionToken = state.session.sessionToken
  return fetch(baseUrl + userId, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": restApiKey,
      "X-Parse-Session-Token": sessionToken
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
