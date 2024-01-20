const Job = require("../model/jobModel");
const User=require('../model/userModel')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {validateMongodbId}=require('../middleware/validate-id')


//for handling the location that user sends every 5 minutes and tells if the user is in the location or not
const findUserInLocation=async(req,res)=>{
    try {
        const { lat1, lon1, lat2, lon2, dist } = req.body; //jobid and userId from frontend
        const parsedLat1 = parseFloat(lat1);
        const parsedLon1 = parseFloat(lon1);
        const parsedLat2 = parseFloat(lat2);
        const parsedLon2 = parseFloat(lon2);
        const parsedDist = parseFloat(dist);

        if (isNaN(parsedLat1) || isNaN(parsedLon1) || isNaN(parsedLat2) || isNaN(parsedLon2) || isNaN(parsedDist)) {
            throw new CustomError("Invalid input. Latitude, longitude, and distance must be valid numbers.", StatusCodes.BAD_REQUEST);
        }
        result = is_within(parsedLat1, parsedLon1, parsedLat2, parsedLon2, parsedDist);

        res.status(StatusCodes.OK).json({ result });

    } catch (error) {
        console.error(error);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }

}

//sudesh, yo function bata total time kati spend garyo vane nikala , yeuta xuttai function banau 
//tesma total time spend tha hos ani tei total time anusar tala reward calculate garxu


function haversine(lat1, lon1, lat2, lon2) {
    const radius = 6371000;
    const dlat = radians(lat2 - lat1);
    const dlon = radians(lon2 - lon1);

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
}

function is_within(lat1, lon1, lat2, lon2, rang) {
    const distance = haversine(lat1, lon1, lat2, lon2);
    return distance <= rang;
}

function radians(degrees) {
    return degrees * (Math.PI / 180);
  }


  //for calculating the reward points if posted by admins
const calculateRewardPoints=async(req,res)=>{
    const {userId,jobId}=req.body;
    validateMongodbId(userId);
    validateMongodbId(jobId);
    const user = await User.findById(userId);
    if (!user) {
        throw new CustomError.CustomAPIError("User not found")
    }
    const job=await Job.findById(jobId);
    if(!job){
        throw new CustomError.CustomAPIError("Job not found")
    }
    const isPostedByAdmin=job.verified;
    if(isPostedByAdmin){
        console.log(user.points)
        //increase reward points
        res.status(StatusCodes.OK).json({msg:"Reward points added"})
    }else{
        //dont increase reward point
        res.status(StatusCodes.OK).json({msg:"Reward points not added"})
    }

}

module.exports={findUserInLocation,calculateRewardPoints}
