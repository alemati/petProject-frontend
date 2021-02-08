import commentService from '../services/commentService'
import { setNotification, closeNotification } from '../reducers/notificationReducer'

const reducer = (state = [], action) => {
    switch (action.type) {
        case ('CREATE_NEW_COMMENT'):
            return state.concat(action.data)
        case ('INIT_COMMENTS'):
            return action.data
        case ('REMOVE_COMMENT'):
            const newState = state.filter(p => p.id !== action.data)
            return newState
        default:
    }
    return state
}

export const initializeComments = () => {
    return async dispatch => {
        const commentsFromServer = await commentService.getAll()
        dispatch({
            type: 'INIT_COMMENTS',
            data: commentsFromServer,
        })
    }
}

export const createNewComment = obj => {
    return async dispatch => {
        try {
            const createdComment = await commentService.createNew(obj)
            dispatch({
                type: 'CREATE_NEW_COMMENT',
                data: createdComment,
            })
        } catch (e) {
            console.log('error caught in commentsReducer', e)
            dispatch(setNotification('error', 'Comment can be at least 3 and at most 200 charachters long!'))
            setTimeout(() => {
                dispatch(closeNotification())
            }, 3000)
        }

    }
}

export const removeComment = (commentId) => {
    return async dispatch => {
        await commentService.remove(commentId)
        dispatch({
            type: 'REMOVE_COMMENT',
            data: commentId
        })
    }
}

export default reducer