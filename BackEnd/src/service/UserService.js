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

exports.updateProfile = (id, body) => {
    return new Promise(async(resolve,reject) => {
        try {

            let user = await User.findById(id)

            user.name = body.name
            user.email = body.email
            user.profilePicture = body.profilePicture
            console.log(user)

            const savedUser = await user.save()
            resolve(savedUser)
        } catch (err) {
            reject(err)
        }
        
    })
}