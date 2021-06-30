const express = require('express');

const router = express.Router();
const { createWorkshop, viewAllWorkshops, viewSpecificUserWokshops, viewSpecificById, deleteById, updateById,
viewApprovedWorkshops, 
updateWorkShopStatus} = require('../service/WorkshopService')
const { isAuth, validateToken, isAdmin, isAdminOrEditor, isEditor, isPresenter, isResearcher, isReviewer } = require('../util/SecurityConfig')

router.post("/create/", async(req,res) => {
    try{
        const result = await createWorkshop(req.body);
        res.status(200).json({result});
    }catch(err) {
        res.status(400).json({'error': err});
    }
});

router.get('/view/all', async (req,res) => {
    try{
        const result = await viewAllWorkshops();
        res.status(200).json({result});
    }catch(err) {
        res.status(400).json({'error': err});
    }
});

router.get('/view/specific/:userid', async (req, res) => {
    try{
        const result = await viewSpecificUserWokshops(req.params.userid);
        res.status(200).json({result});
    }catch(err){
        res.status(400).json({'error': err});
    }
});

router.get('/viewbyid/:id', async (req, res) => {
    try{
        const result = await viewSpecificById(req.params.id);
        res.status(200).json({result});
    }catch(err){
        res.status(400).json({'error': err});
    }
});

router.delete('deletebyid/:id', async (req, res) => {
    try{
        const result = await deleteById(req.params.id);
        res.status(200).json({result});
    }catch(err){
        res.status(400).json({'error': err});
    }
})

router.patch('/updatebyid/:id', async (req, res) => {
    try{
        const result = await updateById(req.params.id, req.body);
        res.status(200).json({result});
    }catch(err){
        res.status(400).json({'error': err});
    }
});

router.put('/updatestatus/:id', async(req, res) => {
    try {
        const result = await updateWorkShopStatus(req.params.id, req.body);
        res.status(200).json({result});
    } catch (err) {
        res.status(400).json({'error': err});
    }
})

router.get('/view/approved', viewApprovedWorkshops);


module.exports = router;