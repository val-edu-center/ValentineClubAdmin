import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import * as courseActions from "../../redux/actions/courseActions"
import * as authorActions from "../../redux/actions/authorActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CourseForm from './CourseForm'
import { newCourse } from '../../../tools/mockData'
import Spinner from "../common/Spinner";
import { toast } from "react-toastify"

const ManageCoursePage = ({ courses, authors, actions, history, ...props }) => {
    //This is how React Hooks add state to function components
    const [course, setCourse] = useState({...props.course})
    const [errors, setErrors] = useState({...props.errors})
    const [saving, setSaving] = useState(false)
    useEffect( () => {
        if (courses.length === 0) {
            actions.courses.loadCourses().catch(error => {
                alert("Loading courses failed " + error)
            })
        } else {
            setCourse({...props.course})
        }
        if (authors.length === 0) {
            actions.authors.loadAuthors().catch(error => {
                alert("Loading authors failed " + error)
            })
        }
    //useEffect with an empty array is equivalent to componentDidMount
    //Otherwise, would run everytime it renders
    }, [props.course])


    //name identifies the field that's changed
    function handleChange(event) {
        const { name, value } = event.target 
        setCourse ( prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
    }

    function formIsValid() {
        const { title, authorId, category } = course
        const errors = {}

        if (!title) errors.title = "Title is required"
        if (!authorId) errors.author = "Author is required"
        if (!category) errors.category = "Category is required"

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    //One way to redirect, history comes from React Router
    function handleSave(event) {
        event.preventDefault()
        if (!formIsValid()) return 
        setSaving(true)
        actions.courses.saveCourse(course).then( () => {
            toast.success("Course saved.")
            history.push("/courses")
        }).catch (error => {
            setSaving(false)
            setErrors( {onSave: error.message} )
        })
    }

    return authors.length === 0 || courses.length === 0 ? (<Spinner/>):(<CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} saving={saving}></CourseForm>)
    
}

ManageCoursePage
.propTypes = {
    course: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null
}

function mapStateToProps(state, ownProps) {
    // this is available bc /:slug in App.js
    const slug = ownProps.match.params.slug
    const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse
    return {
        //newCourse is an empty course
        courses: state.courses,
        authors: state.authors,
        course,
        errors: []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            courses: bindActionCreators(courseActions, dispatch),
            authors: bindActionCreators(authorActions, dispatch)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage
    );