const Job = require("../model/jobModel");
const User=require('../model/userModel')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const findUserInLocation=async(req,res)=>{
    try {
        const { lat1, lon1, lat2, lon2, userId, dist } = req.body;
        const parsedLat1 = parseFloat(lat1);
        const parsedLon1 = parseFloat(lon1);
        const parsedLat2 = parseFloat(lat2);
        const parsedLon2 = parseFloat(lon2);
        const parsedDist = parseFloat(dist);

        if (isNaN(parsedLat1) || isNaN(parsedLon1) || isNaN(parsedLat2) || isNaN(parsedLon2) || isNaN(parsedDist)) {
            throw new CustomError("Invalid input. Latitude, longitude, and distance must be valid numbers.", StatusCodes.BAD_REQUEST);
        }
        result = is_within(parsedLat1, parsedLon1, parsedLat2, parsedLon2, parsedDist);
        const user = User.findById(userId);
        if (!user) {
            throw new CustomError("User not found", StatusCodes.NOT_FOUND);
        }

        if (result) {
            user.reward += 1; // You can adjust this based on your logic
            await user.save();
        }
        res.status(StatusCodes.OK).json({ result });

    } catch (error) {
        console.error(error);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }

}




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


module.exports={findUserInLocation}
