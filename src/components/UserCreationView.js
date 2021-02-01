import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../reducers/usersReducer'
import { setNotification, closeNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {
    Link, useHistory
} from "react-router-dom"


const UserCreationPage = () => {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const history = useHistory()


    const dispatch = useDispatch()

    const handleCreateNew = (event) => {
        event.preventDefault()
        console.log('creating new user with:', username, password, url, name)
        if (username === "" || password === "" || url === "" || name === "") {
            dispatch(setNotification('error', 'Give all required info, please'))
            setTimeout(() => {
                dispatch(closeNotification())
            }, 2000)
        } else {
            const newUser = {
                username: username,
                url: url,
                password: password,
                name: name
            }
            dispatch(createNewUser(newUser))
            history.push('/')
        }
        
    }

    return (
        <div>

            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Sign in</Modal.Title>
                </Modal.Header>

                <form onSubmit={handleCreateNew}>
                    <Modal.Body>
                        Username <input type='text' value={username} placeholder={'3-10 symbols'} onChange={event => setUsername(event.target.value)} />
                        <br />
                        Password <input type='password' value={password} placeholder={'3-10 symbols'} onChange={event => setpassword(event.target.value)} />
                        <br />
                        URL <input type='text' value={url} placeholder={'3-10 symbols'} onChange={event => setUrl(event.target.value)} />
                        <br />
                        Name <input type='text' value={name} placeholder={'at least 1 character'} onChange={event => setName(event.target.value)} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Notification />
                        <Button type='submit'>Create new user</Button>     <Link to="/">Login</Link>
                    </Modal.Footer>
                </form>
            </Modal.Dialog>
        </div>
    )
}

export default UserCreationPage;