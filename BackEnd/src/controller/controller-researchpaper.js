const express = require('express')

const router = express.Router()
const { creteResearchPaper, getAllResearchPaper, getSingleResearchPaper, deleteResearchPaper, updateResearchPaper } = require('../service/service-researchpaper')
const { findUserById } = require('../util/AuthRouteController')


router.post("/create/:userId",async(req,res) => {
    try{
        let paper = req.body;
        paper.ownerRef = req.profile
        const result = await creteResearchPaper(paper)
        res.status(200).json({result})

    }catch(err) {
        res.status(400).json({'eror': err})
    }
})

router.get("/getall", async(req,res) => {
    try {
        const result = await getAllResearchPaper(req.query)
        res.status(200).json({result})
    } catch (err) {
        res.status(400).json({err})
    }
})

router.get("/get/:paperId", (req,res) => {
    res.status(200).json(req.paper)
})


router.get("/get/:paperId", (req,res) => {
    res.status(200).json(req.paper)
})

router.delete("/delete/:paperId", async(req,res) => {
    try {
        const result = await deleteResearchPaper(req.paper)
        res.status(200).json({result})
    } catch (err) {
        res.status(400).json({err})
    }
})

router.put("/update/:paperId", async(req,res) => {
    try {
        
        const result = await updateResearchPaper(req.paper, req.body)
        res.status(200).json({result})

    } catch (err) {
        res.status(400).json({err})
    }
})

router.param("paperId", async(req,res,next,id) => {
    try {
        const result = await getSingleResearchPaper(id)
        req.paper = result
        next()
    } catch (err) {
        res.status(400).json({
            'error': err
        })
    }
})

router.param("userId", findUserById)


module.exports = router