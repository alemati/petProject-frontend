import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import PostPage from './PostPage'
import PostForm from './PostForm'

import SideBarNavigation from './SideBarNavigation'

import HomeView from './HomeView'

import {
    useHistory,
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
                <div className="row">
                    <div className="col-sm-2">
                        <h2>Welcome</h2>
                    </div>
                    <div className="col-sm-8">
                        <p>Logged in as! {login.name}</p>
                    </div>
                    <div className="col-sm-2">
                        <button onClick={handleLogout}>logout</button>
                    </div>
                </div>
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