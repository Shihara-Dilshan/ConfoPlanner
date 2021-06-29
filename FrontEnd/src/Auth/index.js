import {API} from '../config'

import jwt_decode from 'jwt-decode'


const decodeToken = (token) => {
    return jwt_decode(token)
}

export const isReviewer = () => {
    if(isAthenticated()&&isAthenticated().role=='reviewer') {
        return true
    }else {
        return false
    }
}

export const isResearcher = () => {
    if(isAthenticated()&&isAthenticated().role=='researcher') {
        return true
    }else {
        return false
    }
}

export const isAthenticated = () => {
    if(localStorage.getItem("token")) {
        let decode = decodeToken(localStorage.getItem('token')) 
        return decode
    }else {
        return false
    }
}

export const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/api/user/singleuser/${id}`)
        .then(res => {return res.json()})
        .then(res => {
            console.log(res)
            if(res.result!==undefined) {
                resolve(res)
            }else {
                reject(res)
            }
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}