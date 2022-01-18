import React from 'react'
import PropTypes from "prop-types"
import * as roleMapper from "../../utility/RoleMapper"


function getTime(time) {
    return time.split("T")[0]
}

function isNotDeletable(user, sessionRoles) {
    const roles = roleMapper.getRoles(user.roles)
    return roles.isDirector || (roles.isStaff && !sessionRoles.isDirector)
}

const AccountList = ({ onDeleteClick, onIsApprovedChange, onCreateBankAccountChange, onGroupRoleChange, onSubmitClick, session, users, bankAccounts }) => {
    const bankAccountMap = getBankAccountMap(bankAccounts)
    const isAdmin = session.roles.isStaff || session.roles.isDirector
    const isBanker = session.roles.isBanker
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Created Date</th>
                    <th>Group</th>
                    {isAdmin && <th>Approved</th>}
                    {isBanker && <th>Bank Account</th>}
                    {isAdmin && <th />}
                    {isAdmin && <th />}
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
                            <td>{getGroupRoleInput(user, isAdmin, onGroupRoleChange) }</td>
                            {isBanker && <td>{getIsApproved(user, onIsApprovedChange)}</td>}
                            {isBanker &&
                                <td>
                                    {getBankAccount(bankAccountMap[user.username], user.objectId, onCreateBankAccountChange)}
                                </td>
                            }
                            {isAdmin &&
                                <td>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => onSubmitClick(user)}
                                    >
                                        Submit
                                    </button>
                                </td>
                            }
                            {isAdmin &&
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
const getGroupRoleInput = (user, isAdmin, onChange) => {
    if (isAdmin) {
        return <select name="groups" id={user.objectId} value={getRoleOptionValue(user.roles)} onChange={onChange}>
            {
                roleMapper.roleGroups.map(r => getRoleOption(r))
            }
        </select>
    } else {
        return <select name="groups" id="group-select" value={getRoleOptionValue(user.roles)} readOnly >
            {
                roleMapper.roleGroups.map(r => getRoleOption(r))
            }
        </select>

    }
}

const getBankAccountMap = bankAccounts => {
    return bankAccounts.reduce(function (map, bankAccount) {
        map[bankAccount.username] = bankAccount
        return map
    }, {})
}
const getBankAccount = (account, id, handleChange) => {
    if (account) {
        return <p>{"$ " + account.balance}</p>
    } else {
        return <input type="checkbox" id={id} name={id} value={id} onChange={handleChange} />
    }
}
const getRoleOptionValue = roles => {
    return roleMapper.getGroupRole(roles)
}
const getRoleOption = role => {
    return <option key={role} value={role}>{role}</option>
}
const getIsApproved = (user, handleChange) => {
    const isApproved = user.isApproved
    const id = user.objectId
    return <input type="checkbox" id={id} name={id} value={id} defaultChecked={isApproved} onChange={handleChange} />
}
AccountList.propTypes = {
    users: PropTypes.array.isRequired,
    session: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onIsApprovedChange: PropTypes.func.isRequired,
    onCreateBankAccountChange: PropTypes.func.isRequired,
    onSubmitClick: PropTypes.func.isRequired,
    bankAccounts: PropTypes.array.isRequired,
    onGroupRoleChange: PropTypes.func.isRequired
}

export default AccountList