import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

const AccountList = ({ courses, onDeleteClick }) => (
    <table className="table">
        <thead>
            <tr>
                <th>Account Id</th>
                <th>Created At</th>
                <th />
            </tr>
        </thead>
        <tbody>
            {courses.map(course => {
                return (
                    <tr key={course.id}>
                        <td>
                            <Link to={"/course/" + course.slug}>{course.title}</Link>
                        </td>
                        <td> {course.authorName} </td>
                        <td>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => onDeleteClick(course)}
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
    courses: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default AccountList