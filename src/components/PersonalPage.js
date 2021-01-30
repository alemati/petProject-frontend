import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TopBar from './TopBar'
import SideBarNavigation from './SideBarNavigation'
import SkillForm from './SkillForm'


const PersonalPage = () => {
    const login = useSelector(state => state.login)
    const allPosts = useSelector(state => state.posts)
    const users = useSelector(state => state.users)
    const currentUser = users.find(u => u.username === login.username)
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
                    <h4>Me</h4>
                    <h5>My posts:</h5>
                    <hr />
                    {userPosts.map(p => <p key={p.id}>{p.content} <hr /></p>)}
                </div>
                <div className="col-sm-3">
                    <h4>My skills</h4>
                    <SkillForm />
                    
                </div>

            </div>
        </div>







    )
}

export default PersonalPage;