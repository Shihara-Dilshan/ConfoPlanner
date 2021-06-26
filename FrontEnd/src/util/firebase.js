import firebase from 'firebase/app'
import "firebase/storage"

const config = {
    apiKey: "AIzaSyBmqm3N_QkqJ_wKI74UZvSQerOLdDtRvro",
    authDomain: "confoplanner.firebaseapp.com",
    projectId: "confoplanner",
    storageBucket: "confoplanner.appspot.com",
    messagingSenderId: "669190918257",
    appId: "1:669190918257:web:b26f179ede36a3e36bcbd0",
    measurementId: "G-XV4M5K0LTJ",
}

firebase.initializeApp(config)

const storageRef = firebase.storage()

export {storageRef, firebase as default}