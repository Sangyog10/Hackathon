const Job = require("../model/jobModel");
const User=require('../model/userModel')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");


const getLeaderBoard=async(req,res)=>{
    const user = await User.find({}).sort({ points: -1 }).select('name address points');
    res.status(StatusCodes.OK).json({leaderboard:user})

}


module.exports={getLeaderBoard}