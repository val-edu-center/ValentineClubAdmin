import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.MOCK_API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
