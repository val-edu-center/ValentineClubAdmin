import { LOAD_ALL_GAME_NIGHTS_SUCCESS, LOAD_ALL_GAME_NIGHT_VOTES_SUCCESS } from "../actions/actionTypes"
import initialState from "./initialState"

export default function gameNightReducer(state = initialState.gameNight, action) {
    switch (action.type) {
        case LOAD_ALL_GAME_NIGHTS_SUCCESS:
            return { ...state, dates: action.gameNights}
        case LOAD_ALL_GAME_NIGHT_VOTES_SUCCESS:
            return { ...state, votes: action.gameNightVotes }
        default:
            return state
    }
}