import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import TopBar from './TopBar'
import SideBarNavigation from './SideBarNavigation'
import { Link } from 'react-router-dom'

const Settings = () => {
    const [file, setFile] = useState(null)
    const login = useSelector(state => state.login)
    const users = useSelector(state => state.users)
    const currentUser = users.find(u => u.username === login.username)

    const handleUpload = (event) => {
        event.preventDefault()
        console.log(event.target.files[0])
    }

    return (
        <div className="container">
            <TopBar />
            <hr />
            <div className="row">
                <div className="col-sm-2">
                    <SideBarNavigation />
                </div>
                <div className="col-sm-7">
                    <h4>My info and picture</h4>
                    <h5>{currentUser.name}</h5>
                    <hr />
                    <h4>Change password</h4>
                    todo
                </div>
                <div className="col-sm-3">
                    <h4>Upload picture</h4>
                    <input type="file" onChange={(e) => handleUpload(e)}></input>
                </div>

            </div>
        </div>

    )
}

export default Settings;