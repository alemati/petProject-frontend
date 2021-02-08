import React from 'react'
import { Link } from 'react-router-dom'

const SideBarNavigation = () => {
    return (
        <div>
            <Link to="/home">Posts</Link> <br />
            <Link to="/connections">Connections</Link> <br />
            <Link to="/personal">Personal</Link> <br />
        </div>

    )
}

export default SideBarNavigation;