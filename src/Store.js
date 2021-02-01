import { createStore, applyMiddleware, combineReducers } from 'redux'

import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'
import postsReducer from './reducers/postsReducer'
import commentsReducer from './reducers/commentsReducer'
import skillsReducer from './reducers/skillsReducer'
import notificationReducer from './reducers/notificationReducer'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    users: usersReducer,
    login: loginReducer,
    posts: postsReducer,
    comments: commentsReducer,
    skills: skillsReducer,
    notification: notificationReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store