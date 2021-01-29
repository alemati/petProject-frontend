import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { initializeUsers } from '../reducers/usersReducer'
// import loginService from '../services/loginService' 
import { login } from '../reducers/loginReducer'
import Card from 'react-bootstrap/Card'


import {
    Switch, Route, Link, useHistory
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
        <div className="login-form">
            {/* <div > */}

            {/* <div>
          <Link to="/createUser">create new user</Link>
          <br />
          <Link to="/">home</Link>
        </div> */}

            <form onSubmit={handleLogin}>
                username <input type='text' value={username} placeholder={'username'} onChange={event => setUsername(event.target.value)} />
                <br />
                    password <input type='password' value={password} placeholder={'password'} onChange={event => setpassword(event.target.value)} />
                <br />
                <button type='submit'>Login</button>     <Link to="/createUser">create new user</Link> 
                

            </form>

            {/* </div> */}

        </div>
    )
}

export default LoginView;