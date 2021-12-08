import React from 'react'
import PropTypes from "prop-types"
import * as roleMapper from "../../utility/RoleMapper"

function buildRoles(objectId, acl) {
    return roleMapper.getRolesList(objectId, acl).join(', ')
}

function getTime(time) {
    return time.split("T")[0]
}

function isNotDeletable(account, sessionRoles) {
    const roles = roleMapper.getRoles(account.objectId, account.ACL)
    return roles.isDirector || (roles.isStaff && !sessionRoles.isDirector)
}

const AccountList = ({ onDeleteClick, session, accounts }) => {
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
            {accounts.filter(account => !isNotDeletable(account, session.roles)).map(account => {
                return (
                    <tr key={account.objectId}>
                        <td>
                            <p>{account.username}</p>
                        </td>
                        <td> {getTime(account.createdAt)} </td>
                        <td>
                            <strong>{buildRoles(account.objectId, account.ACL)}</strong>
                        </td>

                        {(session.roles.isStaff || session.roles.isDirector) &&
                            <td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => onDeleteClick(account)}
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
    accounts: PropTypes.array.isRequired,
    session: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default AccountList