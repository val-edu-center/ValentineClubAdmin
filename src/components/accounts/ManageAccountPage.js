import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import Parse from 'parse/dist/parse.min.js'
import * as userActions from "../../redux/actions/userActions"
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { newUser } from '../../../tools/mockData'
import AccountForm from "./AccountForm"
import { toast } from "react-toastify"

const ManageAccountPage = ({ accounts, actions, history, ...props }) => {
    const [account, setAccount] = useState({ ...props.account })
    const [errors, setErrors] = useState({ ...props.errors })
    const [saving, setSaving] = useState(false)
    useEffect(() => {
        if (accounts.length === 0) {
            actions.users.loadUsers().catch(error => {
                alert("Loading users failed " + error)
            })
        }

        //useEffect with an empty array is equivalent to componentDidMount
        //Otherwise, would run everytime it renders
    }, [props.account])

    function changeUsername(account, newUsername) {
        const oldParseObject = account.parseObject
        oldParseObject.set("username", newUsername)
        return {
            ...account,
            username: newUsername,
            parseObject: oldParseObject
        }
    }

    function handleUsernameChange(event) {
        const newUsername = event.target.value
        const newAccount = changeUsername(account, newUsername)
        setAccount(newAccount)

    }

    function formIsValid() {
        const { username } = account
        const errors = {}

        if (!username) errors.username = "Username is required"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    //One way to redirect, history comes from React Router
    function handleSave(event) {
        event.preventDefault()
        if (!formIsValid()) return
        setSaving(true)
        actions.user.saveUser(account).then(() => {
            toast.success("Account saved.")
            history.push("/accounts")
        }).catch(error => {
            setSaving(false)
            setErrors({ onSave: error.message })
        })
    }

    return <AccountForm account={account} onUsernameChange={handleUsernameChange} onSave={handleSave} errors={errors} saving={saving}></AccountForm>
}

ManageAccountPage.propTypes = {
    account: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    accounts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug
    const account = slug && state.users.length > 0 ? getUserById(state.users, slug) : createNewUser()
    return {
        accounts: state.users,
        account,
        errors: []
    }
}

function getUserById(users, id) {
    return users.find(user => user.id === id) || null
}

function createNewUser() {
    const user = newUser
    user.parseObject = new Parse.User()
    return user
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            users: bindActionCreators(userActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountPage)