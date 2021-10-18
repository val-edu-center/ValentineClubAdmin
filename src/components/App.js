import React from 'react'
import {Route} from 'react-router-dom'
import HomePage from './home/HomePage'
import AboutPage from './about/AboutPage'
import Header from './common/Header'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min'
import PageNotFound from './common/PageNotFound'
import CoursesPage from './courses/CoursesPage'
import ManageCoursePage from './courses/ManageCoursePage'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <div className="container-fluid">
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/about" component={AboutPage}></Route>
                <Route path="/courses" component={CoursesPage}></Route>
                <Route path="/course/:slug" component={ManageCoursePage}></Route>
                <Route path="/course" component={ManageCoursePage}></Route>
                <Route component={PageNotFound}></Route>
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar />
        </div>
    )
}

export default App