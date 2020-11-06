import React from 'react'
import { Button } from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt'
import googleIcon from '../../assets/google.png'
import { auth, provider } from '../../config/firebase'
import store from '../../redux/store'
import { setUser } from '../../redux/actionCreators'

import './Login.css'



function Login() {

    const handleLogin = () => {
        auth.signInWithPopup(provider)
            .then(response => {
                store.dispatch(setUser(response.user))
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login__header">
                <h1>ToDo</h1>
                <ListAltIcon/>
            </div>
            <div className="login__btnContainer">
                <Button
                    color="primary"
                    variant="contained"
                    className="login__btn"
                    onClick={handleLogin}
                >
                    Sign in &nbsp;
                    <img src={googleIcon} alt="google" /> 
                </Button>
            </div>
        </div>
    )
}

export default Login
