import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
// import TopBar from './HomeView'

import {
    Switch, Route, Link, useHistory,
} from "react-router-dom"

const TopBar = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const login = useSelector(state => state.login)
    if (!login) {
        return null
    }

    const handleLogout = () => {
        dispatch(logout())
        history.push('/')
    }

    return (
        <div className="row">
            <div className="col-sm-2">
                <h2>Welcome</h2>
            </div>
            <div className="col-sm-8">
                <p>Logged in as {login.name}</p>
            </div>
            <div className="col-sm-2">
                <button onClick={handleLogout}>logout</button>
            </div>

        </div>
    )
}

export default TopBar;