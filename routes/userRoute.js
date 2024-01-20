const express = require("express");
const {findUserInLocation,calculateRewardPoints,userDetails}=require('../controllers/userController')
const router = express.Router();

router.post("/location",findUserInLocation)
router.post("/rewards",calculateRewardPoints)
router.post('/details',userDetails)

module.exports =router;