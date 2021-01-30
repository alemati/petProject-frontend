import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TopBar from './TopBar'
import SideBarNavigation from './SideBarNavigation'

import {
    useParams
  } from "react-router-dom"

const UserPage = () => {
    const url = useParams().url
    const login = useSelector(state => state.login)
    const allPosts = useSelector(state => state.posts)
    const users = useSelector(state => state.users)
    const currentUser = users.find(u => u.url === url)
    if (!currentUser) {
        return null
    }
    const userPosts = allPosts.filter(u => u.user === currentUser.id)
    return (

        <div className="container">
            <TopBar />
            <hr />
            <div className="row">
                <div className="col-sm-2">
                    <SideBarNavigation />
                </div>
                <div className="col-sm-7">
                    <h4>{currentUser.name}</h4>
                    <h5>{currentUser.name}'s posts:</h5>
                    {userPosts.map(p => <p key={p.id}>{p.content}</p>)}
                </div>
                <div className="col-sm-3">
                    <h4>{currentUser.name}'s skills</h4>
                </div>

            </div>
        </div>







    )
}

export default UserPage;