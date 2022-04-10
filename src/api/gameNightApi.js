import Parse from 'parse/dist/parse.min.js'
import * as gameNightMapper from '../utility/GameNightMapper'

const gameNightClass = 'GameNight'
const gameNightVoteClass = 'GameNightVotes'
const mockAPI = process.env.MOCK_API;
const baseUrl = process.env.BACK4APP_API_URL + "/classes/";

export const getAllNights = async () => {
    if (mockAPI === "true") {
        return fetch(baseUrl + gameNightClass, {headers: getHeaders()})
            .then(handleResponse)
            .catch(handleError);
        
    } else {
        const query = new Parse.Query(gameNightClass)
        const results = await query.find()
        return results.map(gameNight => gameNightMapper.mapGameNightParse(gameNight))
    }
}

export const getAllVotes = async () => {
    if (mockAPI === "true") {
        return fetch(baseUrl + gameNightVoteClass, {headers: getHeaders()})
            .then(handleResponse)
            .catch(handleError);
        
    } else {
        const query = new Parse.Query(gameNightVoteClass)
        const results = await query.find()
        return results.map(gameNight => gameNightMapper.mapGameNightVoteParse(gameNight)) 
    }
}

export const saveGameNight = async (gameNight) => {
    if (mockAPI === "true") {
        return fetch(baseUrl, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(gameNight)
        })
            .then(handleResponse)
            .catch(handleError);
    } else {
        await gameNight.parseObject.save()
        return gameNightMapper.mapGameNightParse(gameNight.parseObject)

    }
}