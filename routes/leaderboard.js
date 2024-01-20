const express = require("express");
const router = express.Router();
const {getLeaderBoard}=require('../controllers/leaderboard');

router.get('/',getLeaderBoard)


module.exports=router;