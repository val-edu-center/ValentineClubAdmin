import GameNight from '../model/GameNight'

export function mapUserParse(parseGameNight) {
    const gameNight = new GameNight
    gameNight.id = parseGameNight.id
    gameNight.date = parseGameNight.get("date")
    gameNight.options = parseGameNight.get("options")
    gameNight.parseObject = parseGameNight
    return gameNight
}