import React, { useState, createContext, useEffect } from "react";
import jwt_decode from 'jwt-decode'

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [islLoggedIn, setIslLoggedIn] = useState({
    status: false,
    role: undefined,
    id: undefined
  });

  useEffect( () => {
    if(localStorage.getItem('token') !== null) {
        let user = jwt_decode(localStorage.getItem('token')) 
        setIslLoggedIn({status: true, role: user.role, id: user._id})
    }
  }, [])

  return (
    <LoginContext.Provider value={[islLoggedIn, setIslLoggedIn]}>
      {props.children}
    </LoginContext.Provider>
  );
};