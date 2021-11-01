import React from 'react'
import PropTypes from "prop-types"

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

function getTime(time) {
    return time.split("T")[0]
}

const AccountList = ({ accounts}) => (
    <table className="table">
        <thead>
            <tr>
                <th>Account Id</th>
                <th>Created Date</th>
                <th>Administrator Roles</th>
            </tr>
        </thead>
        <tbody>
            {accounts.map(account => {
                return (
                    <tr key={account.objectId}>
                        <td>
                            <p>{account.username}</p>
                        </td>
                        <td> {getTime(account.createdAt)} </td>
                        <td>
                            <strong>{buildRoles(account.ACL)}</strong>
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