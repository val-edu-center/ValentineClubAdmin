import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./components/App"
import './index.css'
import configureStore from './redux/configureStore'
import { Provider as ReduxProvider } from 'react-redux'

const loadFromLocalStorage = () => {
    try {
        const stateStr = localStorage.getItem('state');
        return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const saveToLocalStorage = (state) => {
    const filteredState = {session: state.session}
    try {
        localStorage.setItem('state', JSON.stringify(filteredState));
    } catch (e) {
        console.error(e);
    }
};

const store = configureStore(loadFromLocalStorage())
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});
render(<ReduxProvider store={store}><Router><App /></Router></ReduxProvider>, document.getElementById('app'))