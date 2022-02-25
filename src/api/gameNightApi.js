import Parse from 'parse/dist/parse.min.js'

export const getAllNights = async () => {
    const query = new Parse.Query('GameNight')
    const results = await query.find()
    return results   
}

export const getAllVotes = async () => {
    const query = new Parse.Query('GameNightVotes')
    const results = await query.find()
    return results   
}