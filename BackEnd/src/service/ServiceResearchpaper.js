'use strict'

const Paper = require('../model/ResearchPaper')
const { validatePaper } = require('../validations/researchPaperValidations')


exports.creteResearchPaper = (paper_item) => {
    return new Promise(async(resolve,reject) => {
        
        const validate = validatePaper(paper_item)

         if(validate.error !== undefined) {
             reject(validate.error.details[0].message)
         }else {
            try {
                const paper = new Paper(paper_item)
                const savedPaper = await paper.save()
                resolve(savedPaper)
            } catch (err) {
                console.log(err)
                reject(err)
            }
         }
        
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

exports.getSingleRearchPaperByOwnerId = (ownerId) => {
    return new Promise((resolve,reject) => [
        Paper.aggregate([{ $match: { ownerRef: ownerId  } }]).then((result) => {
            console.log(result)
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    ])
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
    return new Promise(async(resolve,reject) =>{
        paper.url = body.url
        paper.ownerRef = body.ownerRef
        paper.title = body.title
        paper.thumbnail = body.thumbnail
        paper.dateOfConference = body.dateOfConference

        const validate = validatePaper(paper)

        if(validate.error !== undefined) {
            reject(validate.error.details[0].message)
        } else {
            try {
                const updatedPaper = await paper.save()
                resolve(updatedPaper)               
            } catch (err) {
                console.log(err)
                reject(err)
            }
        }

        

    })
}