import * as gameNightApi from "../../api/gameNightApi"
import { beginApiCall, apiCallError } from "./apiStatusActions"
import { LOAD_ALL_GAME_NIGHTS_SUCCESS, LOAD_ALL_GAME_NIGHT_VOTES_SUCCESS } from "./actionTypes"

export function loadGameNightsSuccess(gameNights) {
    return { type: LOAD_ALL_GAME_NIGHTS_SUCCESS, gameNights}
}

export function loadGameNightVotesSuccess(gameNightVotes) {
    return { type: LOAD_ALL_GAME_NIGHT_VOTES_SUCCESS, gameNightVotes}
}

export function loadAllNights() {
    return function (dispatch) {
        dispatch(beginApiCall)
        return gameNightApi
        .getAllNights()
        .then(gameNights => {
            dispatch(loadGameNightsSuccess(gameNights));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function loadAllVotes() {
    return function (dispatch) {
        dispatch(beginApiCall)
        return gameNightApi
        .getAllVotes()
        .then(gameNightVotes => {
            dispatch(loadGameNightVotesSuccess(gameNightVotes));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}