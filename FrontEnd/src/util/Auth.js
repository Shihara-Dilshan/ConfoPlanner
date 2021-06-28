import React, {useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        //app.auth().onAuthStateChanged(setCurrentUser);
        if(localStorage.getItem('loginData')!==undefined) {
            let user = jwt_decode(localStorage.getItem('loginData')) 
            setCurrentUser(user)
        }else {
            setCurrentUser({})
        }
        
    },[])

    return (
        <AuthContext.Provider value={[currentUser, setCurrentUser]}>
            {children}
        </AuthContext.Provider>
    )
}