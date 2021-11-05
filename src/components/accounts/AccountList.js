import React from 'react'
import PropTypes from "prop-types"
import * as roleMapper from "../../utility/RoleMapper"

function buildRoles(objectId, acl) {
    return roleMapper.getRolesList(objectId, acl).join(', ')
}

function getTime(time) {
    return time.split("T")[0]
}

const AccountList = ({ onDeleteClick, session, accounts}) => (
    <table className="table">
        <thead>
            <tr>
                <th>Account Id</th>
                <th>Created Date</th>
                <th>Administrator Roles</th>
                {session.roles.isDirector && <th/>}
            </tr>
        </thead>
        <tbody>
            {accounts.filter(account => {!roleMapper.getRoles(account.objectId, account.ACL).isDirector})
            .map(account => {
                return (
                    <tr key={account.objectId}>
                        <td>
                            <p>{account.username}</p>
                        </td>
                        <td> {getTime(account.createdAt)} </td>
                        <td>
                            <strong>{buildRoles(account.objectId, account.ACL)}</strong>
                        </td>
                        {session.roles.isDirector && <td>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => onDeleteClick(account)}
                            >
                                Delete
                            </button>
                        </td>}
                    </tr>
                )
            })}
        </tbody>
    </table>
)

AccountList.propTypes = {
    accounts: PropTypes.array.isRequired,
    session: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default AccountList