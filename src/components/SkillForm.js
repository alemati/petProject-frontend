import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { createNewPost } from '../reducers/postsReducer'
import UsersList from './UsersList'
import PostPage from './PostPage'


const SkillForm = () => {
    const [value, setValue] = useState("")
    const dispatch = useDispatch()

    const login = useSelector(state => state.login)
    if (!login) {
        return null
    }
    const handleCreateSkill = () => {
        console.log('I want to add a new skill named:', value)
        // const newPost = {
        //     content: contentt,
        //     likes: 0
        // }
        // setContentt('')
        // dispatch(createNewPost(newPost))
    }

    return (
        <div >
            <h5>Add new skill</h5>
            {/* <form onSubmit={handleCreateSkill}> */}
            <input value={value} placeholder={'New skill'} onChange={event => setValue(event.target.value)} />
            {/* <textarea className="post" value={contentt} placeholder={'Write a new post'} onChange={event => setContentt(event.target.value)}></textarea> */}
            <br />
            <button onClick={() => handleCreateSkill()} type='submit'>Add new skill</button>

            {/* </form> */}

        </div>
    )
}

export default SkillForm;