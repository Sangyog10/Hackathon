const express = require("express");
const {findUserInLocation,calculateRewardPoints}=require('../controllers/userController')
const router = express.Router();

router.post("/khatdai",findUserInLocation)
router.post("/rewards",calculateRewardPoints)

module.exports =router;