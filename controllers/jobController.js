const Job = require("../model/jobModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createJob = async (req, res) => {
  const { title, description, date, location } = req.body;
  if (!title || !description || !date || !location) {
    throw new CustomError.BadRequestError("Enter all credentials");
  }
  if (req.body.role === "admin") {
    verified = true;
    role = "admin";
    const job = await Job.create({
      title,
      description,
      date,
      location,
      verified,
      role,
    });
    res.status(StatusCodes.OK).json(job);
  } else {
    const job = await Job.create(req.body);
    res.status(StatusCodes.OK).json(job);
  }
};

const getAllJobs = async (req, res) => {
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
