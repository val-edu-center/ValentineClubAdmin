import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import Parse from 'parse/dist/parse.min.js'
import * as userActions from "../../redux/actions/userActions"
import * as roleActions from "../../redux/actions/roleActions"
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import AccountForm from "./AccountForm"
import { toast } from "react-toastify"
import * as roleMapper from "../../utility/RoleMapper"
import User from "../../model/User"

const ManageAccountPage = ({ accounts, actions, history, allRoles, ...props }) => {
    const [account, setAccount] = useState({ ...props.account })
    const [errors, setErrors] = useState({ ...props.errors })
    const [saving, setSaving] = useState(false)
    useEffect(() => {
        if (accounts.length === 0) {
            actions.users.loadUsers().catch(error => {
                alert("Loading users failed " + error)
            })
        }
        if (allRoles.length === 0) {
            actions.roles.loadAllRoles()
            .then(roles => roles.map(r => actions.roles.loadUsersForRole(r)))
            .catch(error => {
                alert("Loading roles failed " + error)
            })
        }

        //useEffect with an empty array is equivalent to componentDidMount
        //Otherwise, would run everytime it renders
    }, [props.account])

    function changeUsername(account, username) {
        const parseObject = account.parseObject
        parseObject.set("username", username)
        return { ...account, username, parseObject }
    }

    function handleUsernameChange(event) {
        const newUsername = event.target.value
        const newAccount = changeUsername(account, newUsername)
        setAccount(newAccount)

    }

    function changePassword(account, password) {
        const parseObject = account.parseObject
        parseObject.set("password", password)
        return { ...account, password, parseObject }
    }

    function handlePasswordChange(event) {
        const newPassword = event.target.value
        const newAccount = changePassword(account, newPassword)
        setAccount(newAccount)

    }

    function filterOldGroupRole(account) {
        return account.roles.filter(role => role !== account.groupRole)
    }

    function changeGroupRole(account, groupRole) {
        const roles = [...filterOldGroupRole(account), groupRole]
        return { ...account, roles, groupRole }
    }

    function handleRoleChange(event) {
        const newRole = event.target.name
        const newAccount = changeGroupRole(account, newRole)
        setAccount(newAccount)
    }

    function formIsValid() {
        const { username, groupRole, password } = account
        const errors = {}

        if (!username) errors.username = "Username is required"
        if (!groupRole) errors.role = "Role is required"
        if (!password) errors.password = "Password is required"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    //One way to redirect, history comes from React Router
    function handleSave(event) {
        event.preventDefault()
        if (!formIsValid()) return
        setSaving(true)


        const oldGroupRoleName = roleMapper.getGroupRole(account.parseObject.get("roles"))
        const newGroupRoleName = account.groupRole
        account.parseObject.set("roles", account.roles)



        
        actions.users.saveUser(account).then((updatedAccount) => {
            if (newGroupRoleName !== oldGroupRoleName) {
                const newRole = allRoles.find(role => role.getName() === newGroupRoleName)
                var oldRole = null
                if (oldGroupRoleName !== null) {
                    oldRole = allRoles.find(role => role.getName() === oldGroupRoleName)
                }
                actions.roles.changeGroupRole(updatedAccount, newRole, oldRole).then(() => {
                    toast.success("Account saved.")
                    history.push("/accounts")
                })
            }
        }).catch(error => {
            setSaving(false)
            setErrors({ onSave: error.message })
        })
    }

    return <AccountForm account={account} onPasswordChange={handlePasswordChange} onRoleChange={handleRoleChange} onUsernameChange={handleUsernameChange} onSave={handleSave} errors={errors} saving={saving}></AccountForm>
}

ManageAccountPage.propTypes = {
    account: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    accounts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    allRoles: PropTypes.array.isRequired,
    usersToRoles: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug
    const account = slug && state.users.length > 0 ? getUserById(state.users, slug) : createNewUser()
    return {
        allRoles: state.roles.all,
        usersToRoles: state.roles.userToRoles,
        accounts: state.users,
        account,
        errors: []
    }
}

function getUserById(users, id) {
    return users.find(user => user.id === id) || null
}

function createNewUser() {
    const user = new User
    user.parseObject = new Parse.User()
    return user
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            users: bindActionCreators(userActions, dispatch),
            roles: bindActionCreators(roleActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountPage)