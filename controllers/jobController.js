const Job = require("../model/jobModel");
const User=require('../model/userModel')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createJob = async (req, res) => {
  const { title, description, date, latitude,longitude, userId } = req.body;

  try {
    if (!title || !description || !date || !latitude || !longitude) { 
      throw new CustomError.BadRequestError('Enter all credentials');
    }

    const jobUser = await User.findById(userId);
    if (!jobUser) {
      throw new CustomError.NotFoundError('User not found');
    }

    let jobData;

    if (jobUser.role === 'admin') {
      jobData = {
        title,
        description,
        date,
        latitude,
        longitude,
        verified: true,
        createdBy: userId, 
      };
    } else {
      jobData = {
        title,
        description,
        date,
        latitude,
        longitude,
        createdBy: userId, 
      };
    }

    const job = await Job.create(jobData);
    res.status(StatusCodes.OK).json({ msg: 'Job created successfully', job });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};


const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    const currentTime = new Date();

    const categorizedJobs = [];

    for (const job of jobs) {
      const jobDate = new Date(job.date);
      const timeDiff = jobDate - currentTime;

      let remark;
      let timeRemaining;

      if (timeDiff > 0) {
        const thirtyMinutesBefore = new Date(jobDate);
        thirtyMinutesBefore.setMinutes(thirtyMinutesBefore.getMinutes() - 30);
        const thirtyMinutesAfter = new Date(jobDate);
        thirtyMinutesAfter.setMinutes(thirtyMinutesAfter.getMinutes() + 30);

        if (currentTime >= thirtyMinutesBefore && currentTime <= thirtyMinutesAfter) {
          remark = 'imIn'; 
        } else {
          remark = 'interested';
        }

        timeRemaining = calculateTimeRemaining(timeDiff);
      } else if (timeDiff < 0) {
        remark = 'expired';
        timeRemaining = null;
      }

      categorizedJobs.push({
        ...job.toObject(),
        remark,
        timeRemaining,
      });
    }

    res.status(StatusCodes.OK).json({ categorizedJobs });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};


const calculateTimeRemaining = (timeDiff) => {
  const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return {
    hours: hoursRemaining,
    minutes: minutesRemaining,
    seconds: secondsRemaining,
  };
};



const deleteJob = async (req, res) => {
  res.send("delete");
};

const updateJob = async (req, res) => {
  res.send("update");
};

module.exports = { createJob, getAllJobs, deleteJob, updateJob };
