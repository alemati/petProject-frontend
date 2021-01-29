import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { createNewPost } from '../reducers/postsReducer'
import UsersList from './UsersList'
import PostPage from './PostPage'


const PostForm = () => {
    const [contentt, setContentt] = useState("")
    const dispatch = useDispatch()

    const login = useSelector(state => state.login)
    if (!login) {
        return null
    }
    const handleAddPost = () => {
        const newPost = {
            content: contentt,
            likes: 0
        }
        setContentt('')
        dispatch(createNewPost(newPost))
    }


    return (
        <div >
            <h4>Create new post</h4>
            <form onSubmit={handleAddPost}>
                <textarea className="post" value={contentt} placeholder={'Write a new post'} onChange={event => setContentt(event.target.value)}></textarea>
                
                <br />
                <button type='submit'>Create new post</button>

            </form>

        </div>
    )
}

export default PostForm;