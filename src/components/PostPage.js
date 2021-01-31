import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removePost } from '../reducers/postsReducer'
import { updateUser } from '../reducers/usersReducer'

import CommentForm from "./CommentForm"
import CommentsList from "./CommentsList"


import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import {
    Link,
} from "react-router-dom"


const PostPage = () => {
    const login = useSelector(state => state.login)
    const allPosts = useSelector(state => state.posts)
    const users = useSelector(state => state.users)
    const currentUser = users.find(u => u.username === login.username)
    if (!currentUser) {
        return null
    }

    const friends = users.filter(u => {
        if (u.friends.includes(currentUser.id)) {
            return u
        }
    })
    const friendsId = friends.map(f => f.id)
    const postIds = friendsId.concat(currentUser.id)
    const postsByFriends = allPosts.filter(p => {
        if (postIds.includes(p.user)) {
            return p
        }
    })

    return (
        <div >
            <h4>Posts</h4>
            <Accordion defaultActiveKey="0">
                {postsByFriends.map(post => <PostLine key={post.id} post={post} currentUser={currentUser} />)}
            </Accordion>
        </div>
    )
}

const PostLine = ({ post, currentUser }) => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const handleDeletePost = () => {

        const postsWithoutPostId = currentUser.posts.filter(idd => idd !== post.id)
        const userUpdated = { ...currentUser, posts: postsWithoutPostId }


        dispatch(removePost(post.id))
        dispatch(updateUser(userUpdated))
    }
    if (post.user === currentUser.id) {
        return (
            <div>
                <Card >
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey={post.id} >
                            {post.content} <button className="right" onClick={() => handleDeletePost()}>delete</button>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={post.id}>
                        <Card.Body>
                            <div className="row">
                                <div className="col">
                                    <CommentForm postId={post.id} user={currentUser} />
                                </div>
                                <div className="col">
                                    <CommentsList postId={post.id} />
                                </div>

                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </div>
        )
    }
    const postCreator = users.find(u => u.id === post.user)
    return (
        <div>
            <Card>

                <Card.Header>

                    <Accordion.Toggle as={Card.Body} variant="link" eventKey={post.id}>
                        {post.content} <p className="by">by<Link className="by" to={`/user/${postCreator.url}`}>&nbsp;{ postCreator.name}</Link></p> 
                        
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={post.id}>
                    <Card.Body>

                        <div className="row">
                            <div className="col">
                                <CommentForm postId={post.id} user={currentUser} />
                            </div>
                            <div className="col">
                                <CommentsList postId={post.id} />
                            </div>

                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    )
}

export default PostPage;