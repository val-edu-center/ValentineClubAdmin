import React from "react";
import { connect } from 'react-redux'
import * as accountActions from "../../redux/actions/accountActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import AccountList from './AccountList'
import { Redirect } from 'react-router-dom'
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class AccountsPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    }


    componentDidMount() {
        const { accounts, actions} = this.props
        if (accounts.length == 0) {
            actions.accounts.loadAccounts().catch(error => {
                alert("Loading accounts failed " + error)
            })
        }
    }

handleDeleteAccount = account => {
    toast.success("Account deleted")
    this.props.actions.accounts.deleteAccount(account).catch(
        error => toast.error('Delete failed. ' + error.message, { autoClose: false})
    )
}

    render() {
        return (
            <>
                <h2>Accounts</h2>
                {this.props.loading ? (<Spinner/>) : (
                <><button style={{ marginBottom: 20 }} className="btn btn-primary add-course" onClick={ () => this.setState({ redirectToAddCoursePage: true})}>
                    Add Account
                </button>
                <AccountList onDeleteClick={this.handleDeleteAccount} accounts={this.props.accounts}></AccountList></>) 
                }
            </>
        )
    }
}

AccountsPage.propTypes = {
    actions: PropTypes.object.isRequired,
    accounts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

//ownProps not need, so it is removed
function mapStateToProps(state) {
    return { 
        accounts: state.accounts,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);