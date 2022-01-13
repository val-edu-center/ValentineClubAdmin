import React from "react";
import { connect } from 'react-redux'
import * as userActions from "../../redux/actions/userActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import AccountList from './AccountList'
import { Redirect } from 'react-router-dom'
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class AccountsPage extends React.Component {
    componentDidMount() {
        const { users, actions } = this.props
        if (users.length == 0 && this.props.session.sessionToken) {
            actions.users.loadUsers().catch(error => {
                alert("Loading users failed " + error)
            })
        }
    }

    handleUpdateUser = user => {
        toast.success("User updated")
        this.props.actions.users.saveUser(user).catch(
            error => toast.error('Update failed. ' + error.message, { autoClose: false })
        )
    }

    handleDeleteUser = user => {
        toast.success("User deleted")
        this.props.actions.users.deleteUser(user).catch(
            error => toast.error('Delete failed. ' + error.message, { autoClose: false })
        )
    }

    flipIsApproved = user => {
        return {
            ...user,
            isApproved: !user.isApproved
        }
    }

    handleCheckboxChange = event => { 
        const objectId = event.target.id
        const newUser = this.flipIsApproved(this.props.users.find(user => user.objectId === objectId))
        this.props.actions.users.updateUser(newUser)
    }

    render() {
        return (
            <>
                {!this.props.session.sessionToken && <Redirect to="/unauthorized" />}
                {/* TODO: Conditionally render Members instead of accounts, if the current user is a Member */}
                <h2>Accounts</h2>
                {this.props.loading ? (<Spinner />) : (
                    <AccountList session={this.props.session} users={this.props.users} onDeleteClick={this.handleDeleteUser} onCheckboxChange={this.handleCheckboxChange} onSubmitClick={this.handleUpdateUser}></AccountList>)
                }
            </>
        )
    }
}

AccountsPage.propTypes = {
    actions: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

//ownProps not need, so it is removed
function mapStateToProps(state) {
    return {
        users: state.users,
        session: state.session,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            users: bindActionCreators(userActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);