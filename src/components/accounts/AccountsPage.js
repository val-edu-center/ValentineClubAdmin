import React from "react";
import { connect } from 'react-redux'
import * as userActions from "../../redux/actions/userActions"
import * as bankAccountActions from "../../redux/actions/bankAccountActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import AccountList from './AccountList'
import { Redirect } from 'react-router-dom'
import Spinner from "../common/Spinner"
import { toast } from "react-toastify"
import * as roleActions from "../../redux/actions/roleActions"

class AccountsPage extends React.Component {
    componentDidMount() {
        const { users, actions, bankAccounts, session, allRoles } = this.props
        const isAdmin = session.roles.isStaff || session.roles.isDirector
        if (users.length == 0 && session.sessionToken) {
            actions.users.loadUsers().catch(error => {
                alert("Loading users failed " + error)
            })
        }
        if (bankAccounts.length == 0 && session.sessionToken && session.roles.isBanker) {
            actions.bankAccounts.loadBankAccounts().catch(error => {
                alert("Loading accounts failed " + error)
            })
        }
        // if (isAdmin && allRoles.length == 0) {
        //     actions.roles.loadAllRoles().catch(error => {
        //         alert("Loading roles failed " + error)
        //     })
        // }
    }

    handleSaveUser = user => {
        toast.success("User updated")
        this.props.actions.users.saveUser(user).catch(
            error => toast.error('Update failed. ' + error.message, { autoClose: false })
        )
        if (user.createBankAccount) {
            this.props.actions.bankAccounts.createBankAccount(user.username).catch(
                error => toast.error('Bank account creation failed. ' + error.message, { autoClose: false })
            )
        }
        // let myObject = {
        //     "ircEvent": "PRIVMSG",
        //     "method": "newURI",
        //     "regex": "^http://.*"
        //   };
          
        //   const {regex, ...newObj} = myObject;
          
        //   console,log(newObj);   // has no 'regex' key
        //   console,log(myObject); // remains unchanged
    }

    handleDeleteUser = user => {
        toast.success("User deleted")
        this.props.actions.users.deleteUser(user).catch(
            error => toast.error('Delete failed. ' + error.message, { autoClose: false })
        )
        this.props.actions.bankAccounts
    }

    flipIsApproved = user => {
        return {
            ...user,
            isApproved: !user.isApproved
        }
    }

    changeGroupRole = (user, newGroupRole) => {
        //TODO Add logic to keep old non-group roles
        return {
            ...user,
            roles: [newGroupRole]
        }
    }

    flipCreateBankAccount = user => {
        if (user.createBankAccount) {
            return {
                ...user,
                createBankAccount: false
            }
        } else {
            return {
                ...user,
                createBankAccount: true
            }
        }
    }

    handleGroupeRoleChange = event => {
        const objectId = event.target.id
        const newRole = event.target.value
        const newUser = this.changeGroupRole(this.props.users.find(user => user.objectId === objectId), newRole)
        this.props.actions.users.updateUser(newUser)
    }

    handleIsApprovedChange = event => { 
        const objectId = event.target.id
        const newUser = this.flipIsApproved(this.props.users.find(user => user.objectId === objectId))
        this.props.actions.users.updateUser(newUser)
    }

    handleCreateBankAccountChange = event => {
        const objectId = event.target.id
        const newUser = this.flipCreateBankAccount(this.props.users.find(user => user.objectId === objectId))
        this.props.actions.users.updateUser(newUser)
    }

    render() {
        return (
            <>
                {!this.props.session.sessionToken && <Redirect to="/unauthorized" />}
                {/* TODO: Conditionally render Members instead of accounts, if the current user is a Member */}
                <h2>Accounts</h2>
                {this.props.loading ? (<Spinner />) : (
                    <AccountList bankAccounts={this.props.bankAccounts} session={this.props.session} users={this.props.users} onDeleteClick={this.handleDeleteUser} onGroupRoleChange={this.handleGroupeRoleChange} onIsApprovedChange={this.handleIsApprovedChange} onSubmitClick={this.handleSaveUser} onCreateBankAccountChange={this.handleCreateBankAccountChange}></AccountList>)
                }
            </>
        )
    }
}

AccountsPage.propTypes = {
    actions: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    bankAccounts: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    allRoles: PropTypes.array.isRequired
}

//ownProps not need, so it is removed
function mapStateToProps(state) {
    return {
        allRoles: state.allRoles,
        bankAccounts: state.bankAccounts,
        users: state.users,
        session: state.session,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            users: bindActionCreators(userActions, dispatch),
            bankAccounts: bindActionCreators(bankAccountActions, dispatch),
            roles: bindActionCreators(roleActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);