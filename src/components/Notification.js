import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { closeNotification } from '../reducers/notificationReducer'


import {
    Link, useHistory
} from "react-router-dom"

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const history = useHistory()
    const dispatch = useDispatch()
    if (notification === null) {
        return null
    }

    const notType = notification.type === 'error' ? 'Error' : 'Success'

    const solve = () => {
        dispatch(closeNotification())
        // history.push('/')
    }

    return (

        // <div>
            <Alert variant="danger">
                {/* <Alert.Heading>{notType}</Alert.Heading> */}
                <p> {notification.content} </p>
            </Alert>
        // </div>


        // <div>
        //     <Modal.Dialog>
        //         <Modal.Header closeButton>
        //             <Modal.Title>{notType}</Modal.Title>
        //         </Modal.Header>

        //         <Modal.Body>
        //             <p>{notification.content}</p>
        //         </Modal.Body>

        //         <Modal.Footer>
        //             <Button onClick={() => solve()} variant="primary">OK</Button>
        //         </Modal.Footer>
        //     </Modal.Dialog>
        // </div>

    )
}

export default Notification