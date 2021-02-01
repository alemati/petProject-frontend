import React, { useEffect } from 'react'
import LoginView from './components/LoginView'
import UserCreationView from './components/UserCreationView'
import HomeView from './components/HomeView'
import { initializeUsers } from './reducers/usersReducer'
import { initLogin } from './reducers/loginReducer'
import { initializePosts } from './reducers/postsReducer'
import { initializeComments } from './reducers/commentsReducer'
import { initializeSkills } from './reducers/skillsReducer'
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersList from './components/UsersList'
import PersonalPage from './components/PersonalPage'
import UserPage from './components/UserPage'
import { setNotification, closeNotification } from './reducers/notificationReducer'

import {
  Switch, Route,
} from "react-router-dom"

const App = () => {
  console.log('app is running')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeComments())
    dispatch(initializeUsers())
    dispatch(initLogin())
    dispatch(initializePosts())
    dispatch(initializeSkills())
    dispatch(closeNotification())
  }, [dispatch])
  const login = useSelector(state => state.login)

  const users = useSelector(state => state.users)

  return (

    <div>
      {/* <Notification /> */}

      <Switch>

        <Route path="/connections">
          <UsersList />
        </Route>

        <Route path="/personal">
          <PersonalPage />
        </Route>

        <Route path="/user/:url">
          <UserPage />
        </Route>

        <Route path="/home">
          <HomeView />
        </Route>

        <Route path="/createUser">
          <UserCreationView />
        </Route>

        <Route path="/">
          {login !== null && <HomeView />}
          {login === null && <LoginView />}
        </Route>

      </Switch>

    </div>
  )
}

export default App;
