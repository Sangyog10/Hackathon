const {createJob,getAllJobs,deleteJob,updateJob}=require('../controllers/jobController')
const express = require("express");
const router = express.Router();

router.post("/", createJob);
router.get("/", getAllJobs);
router.delete('/:id',deleteJob)
router.patch('/:id',deleteJob)

module.exports = router;

