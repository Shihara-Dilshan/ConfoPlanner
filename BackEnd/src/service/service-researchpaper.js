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