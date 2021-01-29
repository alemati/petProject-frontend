import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../reducers/usersReducer'

import {
    Switch, Route, Link, useHistory
  } from "react-router-dom"


const UserCreationPage = () => {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const [url, setUrl] = useState("")
    const [name, setName] = useState("")

    const dispatch = useDispatch()

    const handleCreateNew = () => {
        console.log('creating new user with:', username, password, url, name)
        if (username === "" || password === "" || url === "" || name === "") {
            console.log('fill all fields')
        } else {
            const newUser = {
                username: username,
                url: url,
                password: password,
                name: name
            }
            dispatch(createNewUser(newUser))
        }
        
    }

    return (
        <div className="login-form">

            <form onSubmit={handleCreateNew}>
                username <input type='text' value={username} placeholder={'username'} onChange={event => setUsername(event.target.value)} />
                <br />
                password <input type='password' value={password} placeholder={'password'} onChange={event => setpassword(event.target.value)} />
                <br />
                url <input type='text' value={url} placeholder={'URL'} onChange={event => setUrl(event.target.value)} />
                <br />
                name <input type='text' value={name} placeholder={'name'} onChange={event => setName(event.target.value)} />
                <br />
                <button type='submit'>Create new user</button>   <Link to="/">login</Link>
            </form>


        </div>
    )
}

export default UserCreationPage;