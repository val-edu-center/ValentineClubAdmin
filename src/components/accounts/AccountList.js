import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

function buildRoles(acl) {
    const roles = []
    //TODO replace this logic to use roles
    if (acl['*'].write) {
        roles.push('Director')
    }
    if (acl['gskFoU7ioY'] != null) {
        roles.push('3D Club')
    }
    if (acl['Nol30IVkdt'] != null) {
        roles.push('Bank')
    }
    return roles.join(',')
}

const AccountList = ({ accounts, onDeleteClick }) => (
    <table className="table">
        <thead>
            <tr>
                <th>Account Id</th>
                <th>Created At</th>
                <th>Administrator Roles</th>
                <th />
            </tr>
        </thead>
        <tbody>
            {accounts.map(account => {
                return (
                    <tr key={account.objectId}>
                        <td>
                            <Link to={"/account/" + account.slug}>{account.username}</Link>
                        </td>
                        <td> {account.createdAt} </td>
                        <td>
                            <Link to={"/account/roles/" + account.slug}>{buildRoles(account.ACL)}</Link>
                        </td>
                        <td>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => onDeleteClick(account)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
)

AccountList.propTypes = {
    accounts: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default AccountList