import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const UserPage = () => {
    const login = useSelector(state => state.login)
    const allPosts = useSelector(state => state.posts)
    const users = useSelector(state => state.users)
    const currentUser = users.find(u => u.username === login.username)
    if (!currentUser) {
        return null
    }

    

    return (
        <div>


        </div>
    )
}

export default UserPage;