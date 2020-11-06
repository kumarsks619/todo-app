import React, { useState, useEffect } from 'react'
import ToDo from './ToDo'
import { Button, Avatar } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Crop75Icon from '@material-ui/icons/Crop75'
import Modal from './ModalBox'
import store from '../../redux/store'
import { setUser, setToDos } from '../../redux/actionCreators'
import { auth, db } from '../../config/firebase'
import firebase from 'firebase'

import './Panel.css'


function Panel() {

    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')


    useEffect(() => {
        const unsubscribe = db.collection("users")
            .doc(store.getState().user.email)
            .collection("toDos")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                store.dispatch(setToDos(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        text: doc.data().text,
                        status: doc.data().status,
                        timestamp: doc.data().timestamp
                    }
                ))))
            })
        
        return () => {
            unsubscribe()
        }
    }, [])


    const handleLogout = () => {
        auth.signOut()
        
        store.dispatch(setUser(null))
    }


    const handleAddNew = (e) => {
        e.preventDefault()

        db.collection("users")
            .doc(store.getState().user.email)
            .collection("toDos")
            .add({
                text: input,
                status: "notDone",
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .catch((error) => alert(error.message))


        setInput('')
        setIsOpen(false)
    }

    const scrollToTop = () => {
        let element = document.getElementById("panel__toDosConatiner")
        element.scrollTop = 0
    }


    return (
        <>
            <div className="panel">
                <div className="panel__header">
                    <h1>ToDo's</h1>
                    <Avatar className="panel__avatar" src={store.getState().user?.photoURL} />
                </div>

                <div className="panel__toDosConatiner" id="panel__toDosConatiner">
                    {
                        store.getState().toDos.map((toDo) => (
                            <ToDo 
                                key={toDo.id} 
                                {...toDo} 
                            />
                        ))
                    }
                </div>

                <div className="panel__footer">
                    <Button
                        color="primary"
                        variant="contained"
                        className="panel__openModalBtn"
                        onClick={() => setIsOpen(true)}
                    >
                        <AddCircleIcon />
                    </Button>

                    <Button
                        variant="contained"
                        className="panel__homeBtn"
                        onClick={scrollToTop}
                    >
                        <Crop75Icon />
                    </Button> 

                    <Button
                        color="secondary"
                        variant="contained"
                        className="panel__logoutBtn"
                        onClick={handleLogout}
                    >
                        <ExitToAppIcon />
                    </Button>
                </div>
            </div>

            <Modal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                input={input}
                setInput={setInput}
                handleSubmit={handleAddNew}
                headerText="Add New"
                btnText="Add"
            />
        </>
    )
}

export default Panel
