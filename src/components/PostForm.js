import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createNewPost } from '../reducers/postsReducer'


const PostForm = () => {
    const [contentt, setContentt] = useState("")
    const dispatch = useDispatch()

    const login = useSelector(state => state.login)
    if (!login) {
        return null
    }
    const handleAddPost = (event) => {
        event.preventDefault()
        try {
            const newPost = {
                content: contentt,
                likes: 0
            }
            setContentt('')
            dispatch(createNewPost(newPost))
        } catch (e) {
            
        }
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