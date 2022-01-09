import Roles from "../model/Roles"

function isDirector(parseRoles) {
    return parseRoles.includes("Director")
}

function isStaff(parseRoles) {
    return parseRoles.includes("Staff")
}

function is3DClubDesigner(parseRoles) {
    return parseRoles.includes("3DDesigner")
}

function is3DClubPrinter(parseRoles) {
    return parseRoles.includes("3DPrinter")
}

function isBanker(parseRoles) {
    return parseRoles.includes("Banker")
}

function isTeen(parseRoles) {
    return parseRoles.includes("Teen")
}

export function getRoles(parseRoles) {
    const roles = new Roles
    if (isDirector(parseRoles)) {
        roles.isDirector = true
    }
    if (is3DClubDesigner(parseRoles)) {
        roles.is3DClubDesigner = true
    }
    if (is3DClubPrinter(parseRoles)) {
        roles.is3DClubPrinter = true
    }
    if (isBanker(parseRoles)) {
        roles.isBanker = true
    }
    if (isStaff(parseRoles)) {
        roles.isStaff = true
    }
    if (isTeen(parseRoles)) {
        roles.isTeen = true
    }
    return roles

}
