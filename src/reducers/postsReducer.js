import postService from '../services/postService'
import Notification from '../components/Notification'
import { setNotification, closeNotification } from '../reducers/notificationReducer'


const reducer = (state = [], action) => {
    switch (action.type) {
        case ('CREATE_NEW_POST'):
            return state.concat(action.data)
        case ('INIT_POSTS'):
            return action.data
        case ('REMOVE_POST'):
            const newState = state.filter(p => p.id !== action.data)
            return newState
        default:
    }
    return state
}

export const initializePosts = () => {
    return async dispatch => {
        const postsFromServer = await postService.getAll()
        dispatch({
            type: 'INIT_POSTS',
            data: postsFromServer,
        })
    }
}

export const createNewPost = obj => {
    return async dispatch => {
        try {
            const createdPOST = await postService.createNew(obj)
            dispatch({
                type: 'CREATE_NEW_POST',
                data: createdPOST,
            })
        } catch (e) {
            console.log('error caught in postReducer', e)
            dispatch(setNotification('error', 'Post can be at least 3 and at most 200 charachters long!'))
            setTimeout(() => {
                dispatch(closeNotification())
            }, 3000)
        }
    }
}

export const removePost = (postId) => {
    return async dispatch => {
        const res = await postService.remove(postId)
        dispatch({
            type: 'REMOVE_POST',
            data: postId
        })
    }
}

export default reducer