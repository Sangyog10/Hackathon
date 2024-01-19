const Job = require("../model/jobModel");
const User=require('../model/userModel')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createJob = async (req, res) => {
  const { title, description, date, location, userId } = req.body;

  try {
    if (!title || !description || !date || !location) {
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
        location,
        verified: true,
        createdBy: userId, 
      };
    } else {
      jobData = {
        title,
        description,
        date,
        location,
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
  //sort near job
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

const deleteJob = async (req, res) => {
  res.send("delete");
};

const updateJob = async (req, res) => {
  res.send("update");
};

module.exports = { createJob, getAllJobs, deleteJob, updateJob };
