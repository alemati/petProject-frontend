
import loginService from '../services/loginService'
import userService from '../services/userService'
import postService from '../services/postService'
import commentService from '../services/commentService'

const reducer = (state = null, action) => {
    // console.log('LOGIN REDUCER state now: ', state)
    // console.log('LOGIN REDUCER action', action)

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
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (exception) {
            console.log('exception! Maybe wrong credentials', exception)
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        userService.removeToken()
        postService.removeToken()
        commentService.removeToken()
        window.localStorage.removeItem('loggedProjectUser')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default reducer