import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyDJsqohs5Xs1enDgF7aIciguu6879SS04Y",
    authDomain: "todo-app-1723c.firebaseapp.com",
    databaseURL: "https://todo-app-1723c.firebaseio.com",
    projectId: "todo-app-1723c",
    storageBucket: "todo-app-1723c.appspot.com",
    messagingSenderId: "414527907544",
    appId: "1:414527907544:web:d4d9b25dfae17912a599ad",
    measurementId: "G-LXEVW2RJ7G"
}


const firebaseApp = firebase.initializeApp(firebaseConfig)


const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export { db, auth, provider }