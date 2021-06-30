const express = require('express');
const { getSingleConfo } = require('../service/ConferenceService');

const { creteResearchPaper, getAllResearchPaper, getSingleResearchPaper,deleteResearchPaper, updateResearchPaper, getSingleRearchPaperByOwnerId,
    viewApprovedPapers } = require('../service/ServiceResearchpaper')
const { findUserById, validateToken, isAuth, isResearcher, isAdmin, isAdminOrEditor, isAdminOrEditorOrReviewerOrResearcher } = require('../util/SecurityConfig')

const router = express.Router()

const { viewApprovedPapers } = require('../service/ServiceResearchpaper');


//create paper by user
router.post("/create/:userId/:confoId", async(req,res) => {
    try{
        let paper = req.body;
        // paper.ownerRef = req.profile._id
        // paper.conferenceRef = req.conference._id
        const result = await creteResearchPaper(paper)
        res.status(200).json({result})

    }catch(err) {
        console.log(err)
        res.status(400).json({'eror': err})
    }
});

//get all papers
router.get("/getall", async(req,res) => {
    try {
        const result = await getAllResearchPaper(req.query)
        res.status(200).json({result})
    } catch (err) {
        res.status(400).json({err})
    }
})

//get paper by paper id
router.get("/get/:paperId", (req,res) => {
    res.status(200).json(req.paper)
})


//get paper base on user
router.get("/getall/:userId", validateToken, isAuth, async(req,res) => {
    try {
        let ownerId = req.profile._id
        console.log(req.profile)
        const result = await getSingleRearchPaperByOwnerId(ownerId)
        res.status(200).json({result})
    } catch (err) {
        res.status(400).json({'error': err})
    }
})

//delete paper by admin or editor
router.delete("/delete/:paperId", validateToken, isAdminOrEditor, async(req,res) => {
    try {
        const result = await deleteResearchPaper(req.paper)
        res.status(200).json({result})
    } catch (err) {
        res.status(400).json({err})
    }
})

//delete paper by paper owner
router.delete("/delete/:paperId/:userId", validateToken, isAuth, isResearcher, async(req,res) => {
    try {
        const result = await deleteResearchPaper(req.paper)
        res.status(200).json({result})
    } catch (err) {
        res.status(400).json({err})
    }
})

//update paper admin or editor
router.put("/update/:paperId", validateToken, isAdminOrEditorOrReviewerOrResearcher, async(req,res) => {
    try {
        
        const result = await updateResearchPaper(req.paper, req.body)
        res.status(200).json({result})

    } catch (err) {
        res.status(400).json({err})
    }
})

//update paper by paper owner
router.put("/update/:paperId/:userId", validateToken, isAuth, isResearcher, async(req,res) => {
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

router.get('/get-approved', viewApprovedPapers);

router.param("userId", findUserById)
router.param("confoId", getSingleConfo)


module.exports = router