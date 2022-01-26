import { LOAD_ALL_ROLES_SUCCESS } from "../actions/actionTypes"
import initialState from "./initialState"

export default function roleReducer(state = initialState.allRoles, action) {
    switch(action.type) {
        case LOAD_ALL_ROLES_SUCCESS:
            return action.allRoles
            //Refactor so that state is an object with .all (allRoles) and .toMap (allRolesMap) fields
            //Do this when the all roles map changes
            // const getAllRolesMap = allRoles => {
            //     const allRolesMap = allRoles.map(role => {
            //         const users = role.getUsers()
            //         const name = role.get("name")
            //         return {name, users}
            //     }).reduce(function(map, role) {
            //         map[role.name] = role.users;
            //         return map;
            //     }, {})
            //     return allRolesMap
            // }
        default:
            return state
    }
}