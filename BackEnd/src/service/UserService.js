'use strict'

const User = require('../model/User')

exports.getAllUsers = () => {
    return new Promise((resolve,reject) => {
       User.find().exec((err,users) => {
           if(err) {
               reject(err)
           }else {
               resolve(users)
           }
       })
    })
}