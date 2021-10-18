import { CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS, LOAD_COURSES_SUCCESS, DELETE_COURSE_OPTIMISTIC } from "./actionTypes";
import * as courseApi from "../../api/courseApi"
import { apiCallError, beginApiCall } from "./apiStatusActions";
//actions must have types
export function createCourseSuccess(course) {
    return { type: CREATE_COURSE_SUCCESS, course}
}

export function updateCourseSuccess(course) {
    return { type: UPDATE_COURSE_SUCCESS, course}
}

export function loadCourseSuccess(courses) {
    return { type: LOAD_COURSES_SUCCESS, courses}
}

export function deleteCourseOptimistic(course) {
    return { type: DELETE_COURSE_OPTIMISTIC, course }
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall)
        return courseApi
        .getCourses()
        .then(courses => {
            dispatch(loadCourseSuccess(courses));
        })
        .catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function saveCourse(course) {
    return function (dispatch) {
        dispatch(beginApiCall())
        return courseApi
        .saveCourse(course)
        .then(savedCourse => {
            if (course.id) {
                dispatch(updateCourseSuccess(savedCourse))
            } else {
                dispatch(createCourseSuccess(savedCourse))
            }
        }).catch (error => {
            dispatch(apiCallError())
            throw error
        })
    }
}

export function deleteCourse(course) {
    return function (dispatch) {
        dispatch(deleteCourseOptimistic(course))
        return courseApi.deleteCourse(course.id)
    }
}