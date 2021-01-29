import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import UsersList from './UsersList'
import { createNewComment } from '../reducers/commentsReducer'


const CommentForm = ({ postId, user }) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState("")
    const allComments = useSelector(state => state.comments)
    

    const handleCreateNewComment = (id) => {
        const newComment = {
            content: value,
            postId: postId,
            user: user.id 
        }
        setValue('')    
        dispatch(createNewComment(newComment))
    }


    return (
        <div >
            <h5>Comment</h5>
            <form onSubmit={() => handleCreateNewComment(postId)}>
                <textarea className="comment" value={value} placeholder={'Write a comment'} onChange={event => setValue(event.target.value)}></textarea>
                <br />
                <button type='submit'>Comment</button>
            </form>



        </div>
    )
}

export default CommentForm;