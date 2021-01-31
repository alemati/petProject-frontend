import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../reducers/usersReducer'

import {
    Link,
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
        <div className="center">

            <form onSubmit={handleCreateNew}>
                Username <input type='text' value={username} placeholder={'3-10 symbols'} onChange={event => setUsername(event.target.value)} />
                <br />
                Password <input type='password' value={password} placeholder={'3-10 symbols'} onChange={event => setpassword(event.target.value)} />
                <br />
                URL <input type='text' value={url} placeholder={'3-10 symbols'} onChange={event => setUrl(event.target.value)} />
                <br />
                Name <input type='text' value={name} placeholder={'at least 1 character'} onChange={event => setName(event.target.value)} />
                <br />
                <button type='submit'>Create new user</button>   <Link to="/">back</Link>
            </form>


        </div>
    )
}

export default UserCreationPage;