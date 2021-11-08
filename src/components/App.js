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