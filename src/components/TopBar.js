import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import Button from 'react-bootstrap/Button'
import Notification from './Notification'

import {
    useHistory,
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
        <div className="topBar">
            <div className="row">
                <div className="col-sm-2">
                    <h2>Welcome</h2>
                </div>
                <div className="col-sm-8">
                    <p>Logged in as {login.name}</p>
                </div>
                <div className="col-sm-2">
                    <Button className="deleteButton" onClick={handleLogout}>logout</Button>
                </div>

            </div>
            <Notification />
        </div>
    )
}

export default TopBar;