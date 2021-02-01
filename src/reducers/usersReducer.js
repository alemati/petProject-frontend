
import usersService from '../services/userService'
import { setNotification, closeNotification } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {

    switch (action.type) {
        case ('CREATE_NEW_USER'):
            return state.concat(action.data)
        case ('INIT_USERS'):
            return action.data
        case 'UPDATE_USER': {
            const id = action.data.id
            return state.map(user => user.id !== id ? user : action.data)
        }
        default:
    }
    return state
}

export const initializeUsers = () => {
    return async dispatch => {
        const usersFromServer = await usersService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: usersFromServer,
        })
    }
}

export const createNewUser = obj => {
    
    return async dispatch => {
        try {
            const createdUser = await usersService.createNew(obj)
            dispatch({
                type: 'CREATE_NEW_USER',
                data: createdUser,
            })
           
        } catch (e) {
            console.log('error is:', e.config)
            dispatch(setNotification('error', e.name))
            setTimeout(() => {
                dispatch(closeNotification())
            }, 3000)
        }

    }
}

export const updateUser = (user) => {
    return async dispatch => {
        const updated = await usersService.update(user.id, user)
        dispatch({
            type: 'UPDATE_USER',
            data: updated,
        })
    }
}


export default reducer