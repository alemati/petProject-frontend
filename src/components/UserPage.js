import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TopBar from './TopBar'
import SideBarNavigation from './SideBarNavigation'
import { updateSkill } from '../reducers/skillsReducer'

import {
    useParams
} from "react-router-dom"

const UserPage = () => {
    const url = useParams().url
    const allPosts = useSelector(state => state.posts)
    const allSkills = useSelector(state => state.skills)
    const users = useSelector(state => state.users)
    const user = users.find(u => u.url === url)
    const userSkills = allSkills.filter(s => s.user === user.id)
    if (!user) {
        return null
    }
    const userPosts = allPosts.filter(u => u.user === user.id)
    const skillsToShow = userSkills.sort((e1, e2) => e2.likes.length - e1.likes.length)
                        
    return (
        <div className="container">
            <TopBar />
            <hr />
            <div className="row">
                <div className="col-sm-2">
                    <SideBarNavigation />
                </div>
                <div className="col-sm-7">
                    <h4>{user.name}</h4>
                    <h5>{user.name}'s posts:</h5>
                    {userPosts.map(p => <p key={p.id}>{p.content}</p>)}
                </div>
                <div className="col-sm-3">
                    <h4>{user.name}'s skills</h4>
                    <hr />
                    {skillsToShow.map(skill => <SkillLine key={skill.id} skill={skill} />)}
                </div>

            </div>
        </div>

    )
}

const SkillLine = ({ skill }) => {
    const dispatch = useDispatch()
    const login = useSelector(state => state.login)
    const users = useSelector(state => state.users)
    const currentUser = users.find(u => u.username === login.username)

    const handleLike = () => {
        // console.log('I want to like this skill', id)
        const updatedLikeList = skill.likes.concat(currentUser.id)
        const updatedSkill = { ...skill, likes: updatedLikeList }
        dispatch(updateSkill(updatedSkill))
    }

    if (skill.likes.includes(currentUser.id)) {
        return (
            <div >
                <p key={skill.id}>{skill.content}: {skill.likes.length} likes. You liked it!</p>
                <hr />
            </div>
        )
    }

    return (
        <div >
            <p key={skill.id}>{skill.content}: {skill.likes.length} likes. <button onClick={() => handleLike()}>like!</button></p>
            <hr />
        </div>
    )
}

export default UserPage;