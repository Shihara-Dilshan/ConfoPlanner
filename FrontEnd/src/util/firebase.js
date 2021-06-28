import firebase from 'firebase/app'
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyA1oeRUhGaYsbsHgXnrbWJBV7GR8kupu0g",
    authDomain: "confopla.firebaseapp.com",
    projectId: "confopla",
    storageBucket: "confopla.appspot.com",
    messagingSenderId: "387182676068",
    appId: "1:387182676068:web:9340518862e77595b7b771",
    measurementId: "G-BEHM1BLYKG"
};

firebase.initializeApp(firebaseConfig);

const storageRef = firebase.storage()

export {storageRef, firebase as default}