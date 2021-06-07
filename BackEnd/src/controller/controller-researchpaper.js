const express = require('express')

const router = express.Router()
const { creteResearchPaper } = require('../service/service-researchpaper')

router.post("/create",async(req,res) => {

    try{
        let paper = req.body;
        const result = await creteResearchPaper(paper)
        res.status(200).json({result})

    }catch(err) {
        res.status(400).json({'eror': err})
    }
    

})

module.exports = router