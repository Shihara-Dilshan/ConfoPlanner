'use strict'

const Joi = require('joi-oid') //changed to joi-oid

const url_pattern = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)'

exports.validatePaper = (paper) => {
    const schema = Joi.object({
        url: Joi.string().required().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/),
        ownerRef: Joi.string().required(),
        title: Joi.string().required(),
        thumbnail: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).required(),
        //dateOfConference: Joi.date().required(),
        status: Joi.string().required(),
        conferenceRef: Joi.objectId().required()
    })

    return schema.validate({
        url: paper.url,
        ownerRef: paper.ownerRef,
        title: paper.title,
        thumbnail: paper.thumbnail,
        //dateOfConference: paper.dateOfConference,
        status: paper.status,
        conferenceRef: paper.conferenceRef
    })
} 
