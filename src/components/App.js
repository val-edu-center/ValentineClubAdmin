import React from 'react'
import {Route} from 'react-router-dom'
import HomePage from './home/HomePage'
import AboutPage from './about/AboutPage'
import Header from './common/Header'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min'
import PageNotFound from './common/PageNotFound'
import LoginPage from './login/LoginPage'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import AccountsPage from './accounts/AccountsPage'
import UnauthorizedPage from './common/UnauthorizedPage'
import LogoutPage from './logout/LogoutPage'
import Parse from 'parse/dist/parse.min.js'

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'pen8j01Zc3JaqVkHmMCbZud1AhOaOMeBYTpzlUhw';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'RJQoYRy9K5rQCB9J5YxEnp1ygWvXefCJIqJkJNn3';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
    return (
        <div className="container-fluid">
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route path="/about" component={AboutPage}></Route>
                <Route path="/login" component={LoginPage}></Route>
                <Route path="/logout" component={LogoutPage}></Route>
                <Route path="/accounts" component={AccountsPage}></Route>
                <Route path="/unauthorized" component={UnauthorizedPage}></Route>
                <Route component={PageNotFound}></Route>
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar />
        </div>
    )
}

export default App