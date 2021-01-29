import React, { useEffect } from 'react'
import LoginView from './components/LoginView'
import UserCreationView from './components/UserCreationView'
import HomeView from './components/HomeView'
import { initializeUsers } from './reducers/usersReducer'
import { initLogin } from './reducers/loginReducer'
import { initializePosts } from './reducers/postsReducer'
import { initializeComments } from './reducers/commentsReducer'

import { useSelector, useDispatch } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';

import UsersList from './components/UsersList'


import {
  Switch, Route, Link,
} from "react-router-dom"

const App = () => {
  console.log('app is running')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeComments())
    dispatch(initializeUsers())
    dispatch(initLogin())
    dispatch(initializePosts())
  }, [dispatch])
  const login = useSelector(state => state.login)

  const users = useSelector(state => state.users)

  return (
    <div>
      {/* {login === null &&
        // <div>
        //   <Link to="/createUser">create new user</Link>
        //   <br />
        //   <Link to="/">home</Link>
        // </div>
        <Route path="/">
          <LoginView />
        </Route>
      } */}
      

      <Switch>

        <Route path="/connections">
          <UsersList />
        </Route>

        <Route path="/home">
          <HomeView />
        </Route>

        <Route path="/createUser">
          <UserCreationView />
        </Route>

        <Route path="/">
          <LoginView />
        </Route>

      </Switch>

    </div>
  )
}

export default App;
