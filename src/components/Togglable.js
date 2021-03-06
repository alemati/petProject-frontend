import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(props.initialState)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div >
      <div style={hideWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
       
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Togglable