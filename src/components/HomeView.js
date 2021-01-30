import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import Togglable from './Togglable'
import UsersList from './UsersList'
import PostPage from './PostPage'
import PostForm from './PostForm'
import styles from '../styles.css'
import TopBar from './TopBar'

import SideBarNavigation from './SideBarNavigation'

// import {
//     useHistory
// } from 'react-router-dom'

import {
    Switch, Route, Link, useHistory,
} from "react-router-dom"

const HomeView = () => {
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


        <div >
            <div className="container">
                <TopBar />
                <hr />
                <div className="row">
                    <div className="col-sm-2">
                        <SideBarNavigation />
                    </div>
                    <div className="col-sm-7">
                        <PostPage />
                    </div>
                    <div className="col-sm-3">
                        <PostForm />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeView;