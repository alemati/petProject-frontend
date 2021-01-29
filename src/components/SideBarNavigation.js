import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import Togglable from './Togglable'
import UsersList from './UsersList'
import PostPage from './PostPage'
import PostForm from './PostForm'
import styles from '../styles.css'

import {
    Switch, Route, Link, useHistory,
} from "react-router-dom"

const SideBarNavigation = () => {

    return (
        <div >
            <div class="sidenav">
                <a href="/home">Posts</a> <br /> 
                <a href="/connections">Connections</a>  <br /> 
                <a className="isDisabled" href="#">Settings</a>  
            </div>
        </div>
    )
}

export default SideBarNavigation;