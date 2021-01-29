
import postService from '../services/postService'
import commentService from '../services/commentService'
import { useDispatch } from 'react-redux'
import { updateUser } from '../reducers/usersReducer'

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
        const createdComment = await commentService.createNew(obj)
        dispatch({
            type: 'CREATE_NEW_COMMENT',
            data: createdComment,
        })
    }
}

export const removeComment = ( commentId ) => {
    return async dispatch => {
        const res = await commentService.remove(commentId)
        dispatch({
            type: 'REMOVE_COMMENT',
            data: commentId
        })
    }
}

export default reducer