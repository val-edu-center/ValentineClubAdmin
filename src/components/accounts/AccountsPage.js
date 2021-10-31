import React from "react";
import { connect } from 'react-redux'
import * as courseActions from "../../redux/actions/courseActions"
import * as authorActions from "../../redux/actions/authorActions"
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
        const { courses, authors, accounts, actions} = this.props
        if (courses.length === 0) {
            actions.courses.loadCourses().catch(error => {
                alert("Loading courses failed " + error)
            })
        }
        if (authors.length === 0) {
            actions.authors.loadAuthors().catch(error => {
                alert("Loading authors failed " + error)
            })
        }
        if (accounts.length == 0) {
            actions.accounts.loadAccounts().catch(error => {
                alert("Loading accounts failed " + error)
            })
        }
    }

handleDeleteCourse = course => {
    toast.success("Course deleted")
    this.props.actions.courses.deleteCourse(course).catch(
        error => toast.error('Delete failed. ' + error.message, { autoClose: false})
    )
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
                {/* One way to redirect, using a flag on state */}
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Accounts</h2>
                {this.props.loading ? (<Spinner/>) : (
                <><button style={{ marginBottom: 20 }} className="btn btn-primary add-course" onClick={ () => this.setState({ redirectToAddCoursePage: true})}>
                    Add Account
                </button>
                <AccountList onDeleteClick={this.handleDeleteCourse} accounts={this.props.accounts}></AccountList></>) 
                }
            </>
        )
    }
}

AccountsPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    accounts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

function mergeAuthorsToCourses(state) {
    if (state.authors.length === 0) {
        return []
    }
    return state.courses.map(course => {
        return {
            ...course,
            authorName: state.authors.find(a => a.id === course.authorId).name
        }
    })
}

//ownProps not need, so it is removed
function mapStateToProps(state) {
    return { 
        courses: mergeAuthorsToCourses(state),
        authors: state.authors,
        accounts: state.accounts,
        loading: state.apiCallsInProgress > 0
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            courses: bindActionCreators(courseActions, dispatch),
            authors: bindActionCreators(authorActions, dispatch),
            accounts: bindActionCreators(accountActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);