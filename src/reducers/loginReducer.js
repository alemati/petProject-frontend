import loginService from '../services/loginService'
import userService from '../services/userService'
import postService from '../services/postService'
import commentService from '../services/commentService'
import skillService from '../services/skillService'
import { setNotification, closeNotification } from '../reducers/notificationReducer'


import {
    Link, useHistory
} from "react-router-dom"

const reducer = (state = null, action) => {

    switch (action.type) {
        case ('LOGIN'):
            return action.data
        case ('LOGOUT'):
            return null
        default:
    }
    return state
}

export const initLogin = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedProjectUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            userService.setToken(user.token)
            postService.setToken(user.token)
            commentService.setToken(user.token)
            skillService.setToken(user.token)
        }
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch({
                type: 'LOGIN',
                data: user
            })
        }
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username,
                password
            })
            window.localStorage.setItem('loggedProjectUser', JSON.stringify(user))
            userService.setToken(user.token)
            postService.setToken(user.token)
            commentService.setToken(user.token)
            skillService.setToken(user.token)
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (exception) {
            dispatch(setNotification('error', 'Wrong credentials'))
            setTimeout(() => {
                dispatch(closeNotification())
            }, 3000)
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        userService.removeToken()
        postService.removeToken()
        commentService.removeToken()
        skillService.removeToken()
        window.localStorage.removeItem('loggedProjectUser')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default reducer