import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userService from '../services/userService'
import { updateUser } from '../reducers/usersReducer'
import Togglable from './Togglable'

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import TopBar from './TopBar'

import SideBarNavigation from './SideBarNavigation'
import PostForm from './PostForm'


import {
    Switch, Route, Link, useHistory,
} from "react-router-dom"

const UsersList = () => {
    const users = useSelector(state => state.users)
    const login = useSelector(state => state.login)

    const currentUser = users.find(u => u.username === login.username)

    const allOtherUsers = users.filter(u => u.username !== login.username)

    const myRequests = allOtherUsers.filter(u => {
        if (u.received.includes(currentUser.id)) {
            return u
        }
    })
    const myRecieved = allOtherUsers.filter(u => {
        if (u.requests.includes(currentUser.id)) {
            return u
        }
    })

    const myFriends = allOtherUsers.filter(u => {
        if (u.friends.includes(currentUser.id)) {
            return u
        }
    })


    const section = {
        paddingTop: 5,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 5,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5
    }


    const neutralUser = allOtherUsers.filter(u => !myRequests.includes(u) && !myRecieved.includes(u) && !myFriends.includes(u))


    return (
        <div className="container">
            <TopBar />
            <hr />
            <div className="row">
                <div className="col-sm-2">
                    <SideBarNavigation />
                    {/* <UsersList /> */}
                </div>
                <div className="col-sm-7">
                    <h4>Contacts</h4>
                    <Accordion defaultActiveKey="0">

                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="1" >
                                    Friends
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body><Friends login={login} users={users} allOtherUsers={allOtherUsers} myRecieved={myRecieved} /></Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        {/* <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="2" >
                                    Other users
                    </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>{neutralUser.map(user => <UserLine key={user.id} user={user} users={users} login={login} status={'stranger'} />)} </Card.Body>
                            </Accordion.Collapse>
                        </Card> */}

                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="3" >
                                    My requests
                    </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>{myRequests.map(user => <UserLine key={user.id} user={user} users={users} login={login} status={'request'} />)}</Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        {/* <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="4" >
                                    <p>My Recieved</p>
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="4">
                                <Card.Body> {myRecieved.map(user => <UserLine key={user.id} user={user} users={users} login={login} status={'received'} />)}</Card.Body>
                            </Accordion.Collapse>
                        </Card> */}


                    </Accordion>
                </div>
                <div className="col-sm-3">
                    <h4>Other users</h4>

                    {neutralUser.map(user => <UserLine key={user.id} user={user} users={users} login={login} status={'stranger'} />)}
                </div>

            </div>
        </div>
    )
}

const Friends = ({ login, users, allOtherUsers, myRecieved }) => {
    const currentUser = users.find(u => u.username === login.username)
    if (!currentUser) {
        return null
    }
    const friends = allOtherUsers.filter(u => {
        if (u.friends.includes(currentUser.id)) {
            return u
        }
    })
    if (myRecieved.length === 0) {
        return (
            <div>
                <h5>My friends</h5>
                <hr />
                {friends.map(user => <UserLine key={user.id} user={user} users={users} login={login} status={'friend'} />)}
            </div>
        )

    }
    return (
        <div>
            <h5>Friend request</h5>
            <hr />
            {myRecieved.map(user => <UserLine key={user.id} user={user} users={users} login={login} status={'received'} />)}
            <h5>My friends</h5>
            <hr />
            {friends.map(user => <UserLine key={user.id} user={user} users={users} login={login} status={'friend'} />)}
        </div>
    )

}

const UserLine = ({ user, users, login, status }) => {
    const dispatch = useDispatch()

    const handleSendRequest = (id) => {
        const currentUser = users.find(u => u.username === login.username)
        const currentUserUpdated = { ...currentUser, requests: currentUser.requests.concat(id) }

        const requestedFriend = users.find(u => u.username === user.username)
        const requestedFriendUpdated = { ...requestedFriend, received: requestedFriend.received.concat(currentUser.id) }

        dispatch(updateUser(currentUserUpdated))
        dispatch(updateUser(requestedFriendUpdated))
    }

    const handleRemoveRequest = (id) => {
        console.log('I changed my mind')
        const currentUser = users.find(u => u.username === login.username)
        const updatedRequests = currentUser.requests.filter(idInList => idInList !== id)
        const updatedCurrentUser = { ...currentUser, requests: updatedRequests }

        const secondUser = users.find(u => u.username === user.username)
        const updatedReceived = secondUser.received.filter(idInList => idInList !== currentUser.id)
        const updatedsecondUser = { ...secondUser, received: updatedReceived }

        dispatch(updateUser(updatedCurrentUser))
        dispatch(updateUser(updatedsecondUser))
    }
    const handleAccept = (id) => {
        console.log('I want to be a friend with you!!!')
        const currentUser = users.find(u => u.username === login.username)
        const updatedReceived = currentUser.received.filter(idInList => idInList !== id)
        const updatedFriends = currentUser.friends.concat(id)
        const updatedCurrentUser = {
            ...currentUser,
            received: updatedReceived,
            friends: updatedFriends
        }

        const secondUser = users.find(u => u.username === user.username)
        const updatedRequests = secondUser.requests.filter(idInList => idInList !== currentUser.id)
        const updatedSecondUser = {
            ...secondUser,
            requests: updatedRequests,
            friends: secondUser.friends.concat(currentUser.id)
        }

        dispatch(updateUser(updatedCurrentUser))
        dispatch(updateUser(updatedSecondUser))

    }
    const handleDecline = (id) => {
        const currentUser = users.find(u => u.username === login.username)
        const updatedReceived = currentUser.received.filter(idInList => idInList !== id)
        const updatedCurrentUser = { ...currentUser, received: updatedReceived }

        const secondUser = users.find(u => u.username === user.username)
        const updatedRequests = secondUser.requests.filter(idInList => idInList !== currentUser.id)
        const updatedSecondUser = { ...secondUser, requests: updatedRequests }

        dispatch(updateUser(updatedCurrentUser))
        dispatch(updateUser(updatedSecondUser))
    }
    const removeFriend = (id) => {
        const currentUser = users.find(u => u.username === login.username)
        const updatedRFriends = currentUser.friends.filter(idInList => idInList !== id)
        const updatedCurrentUser = { ...currentUser, friends: updatedRFriends }

        const secondUser = users.find(u => u.username === user.username)
        const secondUpdatedFriends = secondUser.friends.filter(idInList => idInList !== currentUser.id)
        const updatedSecondUser = { ...secondUser, friends: secondUpdatedFriends }

        dispatch(updateUser(updatedCurrentUser))
        dispatch(updateUser(updatedSecondUser))
    }

    if (status === 'request') {
        return (
            <div>
                <Link to={`/user/${user.url}`}>{ user.name }</Link>   <button onClick={() => handleRemoveRequest(user.id)}>Remove request</button>
                <hr />
            </div>
        )

    } else if (status === 'received') {
        return (
            <div>
                <Link to={`/user/${user.url}`}>{ user.name }</Link> <br />
                <button onClick={() => handleAccept(user.id)}>Accept</button>  <button onClick={() => handleDecline(user.id)}>Decline</button>
                <hr />
            </div>
        )

    } else if (status === 'friend') {
        return (
            <div>
                <Link to={`/user/${user.url}`}>{ user.name }</Link> <button onClick={() => removeFriend(user.id)}>Remove friend</button>
                <hr />
            </div>
        )

    }
    return (
        <div>
            <Link to={`/user/${user.url}`}>{ user.name }</Link>   <button onClick={() => handleSendRequest(user.id)}>Make a friend</button>
            <hr />
        </div>
    )

}

export default UsersList;



