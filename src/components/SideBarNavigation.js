import React from 'react'

const SideBarNavigation = () => {
    return (
        <div >
            <div className="sidenav">
                <a href="/home">Posts</a> <br /> 
                <a href="/connections/">Connections</a>  <br /> 
                <a href="/personal">Personal</a> <br /> 
                <a href="#">Settings</a>   
            </div>
        </div>
    )
}

export default SideBarNavigation;