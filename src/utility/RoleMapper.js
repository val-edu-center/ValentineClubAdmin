import Roles from "../model/Roles"

const programDiectorUsername = process.env.PROGRAM_DIRECTOR_USERNAME
const clubDiectorUsername = process.env.CLUB_DIRECTOR_USERNAME

function isDirector(objectId) {
    return objectId === programDiectorUsername || objectId === clubDiectorUsername
}

function is3DClubEmployee(acl) {
    return acl['role:3D Club Designer'] || acl['role:3D Club Printer']
}

function isBanker(acl) {
    return acl['role:Banker']
}

export function getRolesList(objectId, acl) {
    const roles = []
    //TODO replace this logic to use roles
    if (isDirector(objectId)) {
        roles.push('Director')
    }
    if (is3DClubEmployee(acl)) {
        roles.push('3D Club')
    }
    if (isBanker(acl)) {
        roles.push('Banker')
    }
    return roles
}

export function getRoles(objectId, acl) {
    const roles = new Roles
    //TODO replace this logic to use roles
    if (isDirector(objectId)) {
        roles.isDirector = true
    }
    if (is3DClubEmployee(acl)) {
        roles.is3DClub = true
    }
    if (isBanker(acl)) {
        roles.isBanker = true
    }
    return roles
}