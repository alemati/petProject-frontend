import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import Notification from './Notification'
import { closeNotification } from '../reducers/notificationReducer'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {
    Link, useHistory
} from "react-router-dom"


const LoginView = () => {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()
    dispatch(closeNotification())

    const handleLogin = (event) => {
        event.preventDefault()
        console.log('logining is with:', username, password)
        dispatch(login(username, password))
    }

    return (
        <div>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>

                <form onSubmit={handleLogin}>
                    <Modal.Body>

                        Username <input type='text' value={username} placeholder={'3-10 symbols'} onChange={event => setUsername(event.target.value)} />
                        <br />
                        Password <input type='password' value={password} placeholder={'3-10 symbols'} onChange={event => setpassword(event.target.value)} />

                    </Modal.Body>

                    <Modal.Footer>
                        <Notification />
                        <Button type='submit'>Login</Button>     <Link to="/createUser">create new user</Link>
                    </Modal.Footer>
                </form>
            </Modal.Dialog>
        </div>
    )
}

export default LoginView;
