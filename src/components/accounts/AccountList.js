import React from 'react'
import PropTypes from "prop-types"
import * as roleMapper from "../../utility/RoleMapper"


function getTime(time) {
    return time.split("T")[0]
}

function isNotDeletable(user, sessionRoles) {
    const roles = roleMapper.getAllRoles(user.roles)
    return roles.isDirector || (roles.isStaff && !sessionRoles.isDirector)
}

const AccountList = ({ onDeleteClick, session, users }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Account Id</th>
                    <th>Created Date</th>
                    <th>Group</th>
                    <th>Is Approved</th>
                    {(session.roles.isBanker) && <th>Bank Account</th>}
                    {(session.roles.isStaff || session.roles.isDirector) && <th />}
                </tr>
            </thead>
            <tbody>
                {users.filter(user => !isNotDeletable(user, session.roles)).map(user => {
                    return (
                        <tr key={user.objectId}>
                            <td>
                                <p>{user.username}</p>
                            </td>
                            <td> {getTime(user.createdAt)} </td>
                            <td>
                                <select name="groups" id="group-select" value={getRoleOptionValue(user.roles)} readOnly >
                                    {
                                        roleMapper.roleGroups.map(r => getRoleOption(r))
                                    }
                                </select>
                            </td>
                            <td>{getIsApproved(user.isApproved)}</td>
                            {(session.roles.isBanker) &&
                                <td>
                                    <p>Checkbox</p>
                                </td>
                            }
                            {(session.roles.isStaff || session.roles.isDirector) &&
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => onDeleteClick(user)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
const getRoleOptionValue = roles => {
    return roleMapper.getGroupRole(roles)
}
const getRoleOption = role => {
    return <option key={role} value={role}>{role}</option>
}
const getIsApproved = isApproved => {
    if (isApproved) {
        return <p>Yes</p>
    } else {
        return <p>No</p>
    }
}
AccountList.propTypes = {
    users: PropTypes.array.isRequired,
    session: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default AccountList