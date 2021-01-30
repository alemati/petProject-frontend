import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import UsersList from './UsersList'
import { createNewComment } from '../reducers/commentsReducer'

import {
    Switch, Route, Link, useHistory,
} from "react-router-dom"


const CommentList = ({ postId }) => {
    const allComments = useSelector(state => state.comments)
    const commentsToPost = allComments.filter(c => c.post === postId)
    return (
        <div>
            <h5>Recent comments</h5>
            <div className="comments-list">
                {commentsToPost.map(c => <CommentLine key={c.id} comment={c} />)}
            </div>
        </div>
    )
}

const CommentLine = ({ comment }) => {
    const users = useSelector(state => state.users)
    const creator = users.find(u => u.id === comment.user)
    return (
        <div>
            {/* <span> {comment.content} <p className="by">by {creator.name}</p></span> */}
            <span> {comment.content} <p className="by">by<Link className="by" to={`/user/${creator.url}`}>&nbsp;{ creator.name}</Link></p> </span>
            
            <hr />
        </div>
    )

}

export default CommentList;