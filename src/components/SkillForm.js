import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createNewSkill, removeSkill } from '../reducers/skillsReducer'
import { updateUser } from '../reducers/usersReducer'

const SkillForm = () => {
    const [value, setValue] = useState("")
    const dispatch = useDispatch()

    const login = useSelector(state => state.login)
    const allSkills = useSelector(state => state.skills)

    const users = useSelector(state => state.users)
    const currentUser = users.find(u => u.username === login.username)
    const userSkills = allSkills.filter(s => s.user === currentUser.id)
    const skillsToShow = userSkills.sort((e1, e2) => e2.likes.length - e1.likes.length)

    const handleCreateSkill = (event) => {
        event.preventDefault()
        const newSkill = {
            content: value,
            likes: []
        }
        setValue('')
        dispatch(createNewSkill(newSkill))
    }

    return (
        <div >
            <h5>Add new skill</h5>

            <form onSubmit={handleCreateSkill}>
                <input value={value} placeholder={'New skill'} onChange={event => setValue(event.target.value)} />
                <button type='submit'>Add new skill</button>
            </form>
            <hr />
            {skillsToShow.map(skill => <SkillLine key={skill.id} skill={skill} creator={currentUser} />)}


        </div>
    )
}

const SkillLine = ({ skill, creator }) => {
    const dispatch = useDispatch()
    const handleDeleteSkill = (id) => {
        const updatedSkillList = creator.skills.filter(skillId => skillId !== id)
        const updatedUser = { ...creator, skills: updatedSkillList }

        dispatch(removeSkill(id))
        dispatch(updateUser(updatedUser))
    }

    return (
        <div >
             <p key={skill.id}>{skill.content} likes: {skill.likes.length} <button onClick={() => handleDeleteSkill(skill.id)}>Delete</button></p>
             <hr />
        </div>
    )
}

export default SkillForm;