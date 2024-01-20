const Job = require("../model/jobModel");
const User=require('../model/userModel')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {validateMongodbId}=require('../middleware/validate-id')


//for handling the location that user sends every 5 minutes and tells if the user is in the location or not
// Assuming there's a User model with a 'zoneEntryTime' and 'totalTimeInZone' field

const findUserInLocation = async (req, res) => {
    try {
        const { lat1, lon1, lat2, lon2, dist, userId } = req.body; 
        const parsedLat1 = parseFloat(lat1);
        const parsedLon1 = parseFloat(lon1);
        const parsedLat2 = parseFloat(lat2);
        const parsedLon2 = parseFloat(lon2);
        const parsedDist = parseFloat(dist);

        if (isNaN(parsedLat1) || isNaN(parsedLon1) || isNaN(parsedLat2) || isNaN(parsedLon2) || isNaN(parsedDist)) {
            throw new CustomError("Invalid input. Latitude, longitude, and distance must be valid numbers.", StatusCodes.BAD_REQUEST);
        }

        const isInZone = is_within(parsedLat1, parsedLon1, parsedLat2, parsedLon2, parsedDist);

        const user = await User.findById(userId);

        if (!user) {
            throw new CustomError("User not found", StatusCodes.NOT_FOUND);
        }

        if (isInZone) {
            if (!user.zoneEntryTime) {

                user.zoneEntryTime = new Date(); //8.22
            } else {
                const currentTime = new Date(); //8.27
                const timeSpentInZone = currentTime - user.zoneEntryTime;//5

                user.totalTimeInZone = timeSpentInZone;


            }
        } else {
            if (user.zoneEntryTime) {
                const currentTime = new Date(); //8.27
                const timeSpentInZone = currentTime - user.zoneEntryTime;//5
                user.zoneEntryTime = null;
            }
        }
        await user.save();

        res.status(StatusCodes.OK).json({ total:user.totalTimeInZone });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};





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
        const timeInMin=user.totalTimeInZone/(1000*60).toFixed(2);
        user.points=(user.points+ timeInMin).toFixed(2);
        user.totalTimeInZone = 0;
        await user.save();
        res.status(StatusCodes.OK).json({msg:"Reward points added", points: user.points})
    }else{
        user.totalTimeInZone=0;
        await user.save();
        res.status(StatusCodes.OK).json({msg:"success",points:user.points})
    }

}

module.exports={findUserInLocation,calculateRewardPoints}
