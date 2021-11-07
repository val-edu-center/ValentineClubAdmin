import Roles from "../model/Roles"

const programDiectorUsername = process.env.PROGRAM_DIRECTOR_USERNAME
const clubDiectorUsername = process.env.CLUB_DIRECTOR_USERNAME

function isDirector(objectId) {
    return objectId === programDiectorUsername || objectId === clubDiectorUsername
}

function isStaff(acl) {
    return acl['role:Director'] && !acl['role:Staff']
}

function is3DClubDesigner(acl) {
    return acl['role:3D Club Designer']
}

function is3DClubPrinter(acl) {
    return acl['role:3D Club Printer']
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
    if (is3DClubDesigner(acl)) {
        roles.push('3D Designer')
    }
    if (isBanker(acl)) {
        roles.push('Banker')
    }
    if (isStaff(acl)) {
        roles.push('Staff')
    }
    if (is3DClubPrinter(acl)) {
        roles.push('3D Printer')
    }
    return roles
}

export function getRoles(objectId, acl) {
    const roles = new Roles
    //TODO replace this logic to use roles
    if (isDirector(objectId)) {
        roles.isDirector = true
    }
    if (is3DClubDesigner(acl)) {
        roles.is3DClubDesigner = true
    }
    if (is3DClubPrinter(acl)) {
        roles.is3DClubPrinter = true
    }
    if (isBanker(acl)) {
        roles.isBanker = true
    }
    if (isStaff(acl)) {
        roles.isStaff = true
    }
    return roles
}