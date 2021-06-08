'use strict'

const env = require('dotenv');

const expressJwt = require('express-jwt')
const { findUserByIdService } = require('../service/AuthService')

env.config()

exports.requireSignIn = expressJwt({
    secret: process.env.TOKENSCRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty: "auth"
})

exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id

    if(!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }

    next()
}

exports.findUserById = async(req,res,next,id) => {
    try {
        let result = await findUserByIdService(id)
        result.password = undefined
        req.profile = result
        next()
    } catch (err) {
        res.status(400).json({'error': err})
    }
}