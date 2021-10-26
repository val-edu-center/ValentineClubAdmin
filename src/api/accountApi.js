import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.BACK4APP_API_URL + "/users/";
const appId = process.env.BACK4APP_APP_ID;
const restApiKey = process.env.BACK4APP_REST_API_KEY;

export function getAccounts() {
  return fetch(baseUrl, {
    headers: {
      "content-type": "application/json",
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": restApiKey
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
//TODO handle puts
export function saveAccount(account) {
  return fetch(baseUrl + (account.id || ""), {
    method: account.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      "content-type": "application/json",
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": restApiKey
    },
    body: JSON.stringify(account)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAccount(accountId) {
  return fetch(baseUrl + accountId, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "X-Parse-Application-Id": appId,
      "X-Parse-REST-API-Key": restApiKey
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
