import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createNewComment } from '../reducers/commentsReducer'
import Button from 'react-bootstrap/Button'

const CommentForm = ({ postId, user }) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState("")

    const handleCreateNewComment = () => {
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
            <textarea className="comment" value={value} placeholder={'Write a comment'} onChange={event => setValue(event.target.value)}></textarea>
            <br />
            <Button onClick={() => handleCreateNewComment()} type='submit'>Comment</Button>
        </div>
    )
}

export default CommentForm;