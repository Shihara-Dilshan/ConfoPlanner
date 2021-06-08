'use strict'

const env = require('dotenv');
const jwt = require('jsonwebtoken')
const { findUserByIdService } = require('../service/AuthService')

env.config()

exports.validateToken = async (req,res,next) => {
    const token = req.headers.token
    if(!token) {
        res.status(403).send("Token is not provided")
    }else {
        jwt.verify(token, process.env.TOKENSCRET, function(err, decoded) {
            if(err) {
                res.status(403).json({"err": err})
            }else {
                req.user = decoded
                console.log(decoded)
                next()
            }
        })
    }

}

exports.isAuth = (req,res,next) => {
    let user = req.profile && req.user && req.profile._id == req.user._id

    if(!user) {
        return res.status(403).json({
            error: "Access Denied! Not Your Resource"
        })
    }else {
        next()
    }

}

exports.isResearcher = (req,res,next) => {
    if(req.profile.role!=='researcher') {
        return res.status(403).json({
            'error': 'Access denied! Researcher Resource'
        })
    }else {
        next()
    }
}

exports.isAdmin = (req,res,next) => {
    if(req.user.role!=='admin') {
        return res.status(403).json({
            'error': 'Access denied! Admin Resource'
        })
    }else {
        next()
    }
}

exports.isAdminOrEditor = (req,res,next) => {
    if(req.user.role!=='admin') {
        return res.status(403).json({
            'error': 'Access denied! Admin or Editor Resource'
        })
    }else {
        next()
    }
}

exports.isPresenter = (req,res,next) => {
    if(req.profile.role!=='presenter') {
        return res.status(403).json({
            'error': 'Access denied! Research Presenter Resource'
        })
    }else {
        next()
    }
}

exports.isEditor = (req,res,next) => {
    if(req.profile.role!=='editor') {
        return res.status(403).json({
            'error': 'Access denied! Editor Resource'
        })
    }else {
        next()
    }
}

exports.isReviewer = (req,res,next) => {
    if(req.profile.role!=='reviewer') {
        return res.status(403).json({
            'error': 'Access denied! Reviewer Resource'
        })
    }else {
        next()
    }
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