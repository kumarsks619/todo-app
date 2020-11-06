import React, { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import DirectionsIcon from '@material-ui/icons/Directions'
import store from '../../../redux/store'
import { updateStatus, deleteTodo, editToDo } from '../../../redux/actionCreators'
import { db } from '../../../config/firebase'
import ModalBox from '../ModalBox'
import EditIcon from '@material-ui/icons/Edit'

import './ToDo.css'



function ToDo({ id, text, status, timestamp }) {

    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState(text)
    const [timestampString, setTimestampString] = useState('')

    const handleStatus = (id, status) => {
        store.dispatch(updateStatus(id, status))

        db.collection("users")
            .doc(store.getState().user.email)
            .collection("toDos")
            .doc(id)
            .set({
                status,
            }, { merge : true })
            .catch(error => alert(error.message))
    }

    const handleDelete = (id) => {
        store.dispatch(deleteTodo(id))

        db.collection("users")
            .doc(store.getState().user.email)
            .collection("toDos")
            .doc(id)
            .delete()
            .catch(error => error.message)
    }


    const handleEdit = (e) => {
        e.preventDefault()

        store.dispatch(editToDo(id))

        db.collection("users")
            .doc(store.getState().user.email)
            .collection("toDos")
            .doc(id)
            .set({
                text: input
            }, { merge: true })
            .catch(error => alert(error.message))

        setIsOpen(false)
    }

    const generateTimestamp = (timestamp) => {
        let dateObj = new Date(timestamp.toDate())

        const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const monthNames = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let timestampString = `created on ${weekNames[dateObj.getDay()]}, ${dateObj.getDate()} ${monthNames[dateObj.getMonth()]}`

        return timestampString
    }

    useEffect(() => {
        if(timestamp) {
            setTimestampString(generateTimestamp(timestamp))
        }
    }, [timestamp])


    return (
        <>
            <div className={`toDo ${status}`}>
                <div className="toDo__textWrapper">
                    <h4>{text}</h4>
                    <p className="toDo__timestamp">
                        <i>{timestampString}</i>
                    </p>
                </div>
                
                <div className="toDo__btnWrapper">
                    <IconButton
                        className="toDo__btnEdit"
                        onClick={() => setIsOpen(true)}
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        className="toDo__btnDone"
                        onClick={() => handleStatus(id, "done")}
                    >
                        <CheckCircleIcon />
                    </IconButton>

                    <IconButton
                        className="toDo__btnProgress"
                        onClick={() => handleStatus(id, "inProgress")}
                    >
                        <DirectionsIcon />
                    </IconButton>

                    <IconButton
                        className="toDo__btnDelete"
                        onClick={() => handleDelete(id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>

            <ModalBox 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                input={input}
                setInput={setInput}
                handleSubmit={handleEdit}
                headerText="Edit"
                btnText="Update"
            />
        </>
        
    )
}

export default ToDo
