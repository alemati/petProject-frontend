import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

import {
    Link, useHistory
} from "react-router-dom"


const LoginView = () => {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogin = () => {
        console.log('logining is with:', username, password)
        dispatch(login(username, password))
        history.push('/home')
    }

    return (
        <div className="center">
            <form onSubmit={handleLogin}>
                Username <input type='text' value={username} placeholder={'3-10 symbols'} onChange={event => setUsername(event.target.value)} />
                <br />
                Password <input type='password' value={password} placeholder={'3-10 symbols'} onChange={event => setpassword(event.target.value)} />
                <br />
                <button type='submit'>Login</button>     <Link to="/createUser">create new user</Link>
            </form>
        </div>
    )
}

export default LoginView;
