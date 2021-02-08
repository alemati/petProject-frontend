import React from 'react'
import { useSelector } from 'react-redux'
import PostPage from './PostPage'
import PostForm from './PostForm'
import TopBar from './TopBar'

import SideBarNavigation from './SideBarNavigation'

const HomeView = () => {
    const login = useSelector(state => state.login)
    if (!login) {
        return null
    }

    return (
        <div >
            <div className="container">
                <TopBar />
                <hr />
                <div className="row">
                    <div className="col-sm-2">
                        <SideBarNavigation />
                    </div>
                    <div className="col-sm-7">
                        <PostPage />
                    </div>
                    <div className="col-sm-3">
                        <PostForm />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeView;