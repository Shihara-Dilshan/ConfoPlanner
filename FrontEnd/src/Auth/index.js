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
    if(localStorage.getItem("loginData")) {
        let decode = decodeToken(localStorage.getItem('loginData')) 
        return decode
    }else {
        return false
    }
}