const express = require("express");
const {findUserInLocation}=require('../controllers/userController')
const router = express.Router();

router.post("/khatdai",findUserInLocation)

module.exports =router;