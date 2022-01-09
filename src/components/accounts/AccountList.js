import React from 'react'
import PropTypes from "prop-types"
import * as roleMapper from "../../utility/RoleMapper"

function buildRoles(roles) {
    return roles.join(', ')
}

function getTime(time) {
    return time.split("T")[0]
}

function isNotDeletable(user, sessionRoles) {
    const roles = roleMapper.getRoles(user.roles)
    console.log(user)
    console.log(roles)
    return roles.isDirector || (roles.isStaff && !sessionRoles.isDirector)
}

const AccountList = ({ onDeleteClick, session, users }) => {
    console.log(session)
    return (
    <table className="table">
        <thead>
            <tr>
                <th>Account Id</th>
                <th>Created Date</th>
                <th>Administrator Roles</th>
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
                            <strong>{buildRoles(user.roles)}</strong>
                        </td>

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
)}

AccountList.propTypes = {
    users: PropTypes.array.isRequired,
    session: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default AccountList