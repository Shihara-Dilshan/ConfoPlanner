'use strict'

const Paper = require('../model/model-reasearchpaper')

exports.creteResearchPaper = (paper_item) => {
    return new Promise((resolve,reject) => {
        const paper = new Paper(paper_item)

        paper.save((err,saved_paper) => {
            if(err) {
                reject(err)
            }else {
                resolve(saved_paper)
            }
        })
        
    });
}

exports.getAllResearchPaper = (query) => {
    return new Promise((resolve,reject) => {
        let sortBy = query.sortBy ? query.sortBy : "_id";
        let orderBy = query.orderBy ? query.orderBy : "asc";
        let limit = query.limit ? query.limit : 100;

        Paper.find()
            .limit(limit)
            .exec((err, paper) => {
                if(err) {
                    reject(err)
                }else {
                    resolve(paper)
                }
            })

    })
}

exports.getSingleResearchPaper = (id) => {
    return new Promise((resolve,reject) => {
        Paper.findById(id).exec((err,paper) => {
            if(err) {
                reject(err)
            }else {
                resolve(paper)
            }
        })
    })
}

exports.deleteResearchPaper = (paper) => {
    return new Promise((resolve,reject) => {
        paper.remove((err,paper) => {
            if(err) {
                reject(err)
            }else {
                resolve(paper)
            }
        })
    })
}

exports.updateResearchPaper = (paper, body) => {
    return new Promise((resolve,reject) =>{
        paper.paper = body.paper
        paper.ownerRef = body.ownerRef
        paper.name = body.name
        paper.save((err,paper) => {
            if(err) {
                reject(err)
            }else {
                resolve(paper)
            }
        })
    })
}