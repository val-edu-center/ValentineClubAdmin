
import User from '../model/User'
import * as roleMapper from './RoleMapper'

export function mapUserParse(parseUser) {
    const user = new User
    user.createdAt = parseUser.createdAt
    user.id = parseUser.id
    user.username = parseUser.getUsername()
    user.roles = parseUser.get("roles")
    user.isApproved = parseUser.get("isApproved")
    user.parseObject = parseUser
    user.groupRole = roleMapper.getGroupRole(parseUser.get("roles"))
    return user
}